# Documentación Técnica: MCyMB (Sistema Multimedia Cristiano y Proyección Bíblica)

## 1. Resumen Ejecutivo

Este documento detalla la reingeniería, modernización y personalización de **MCyMB** (anteriormente conocido como Proyektor, originalmente basado en la máquina virtual cerrada **NekoVM** con bytecode compilado en `index.n`) hacia una arquitectura moderna, abierta y 100% modificable construida en **Node.js**.

Todos los activos que estaban bloqueados dentro del binario (`index.n`) han sido extraídos, organizados y convertidos en código fuente editable en la carpeta `public/`.

---

## 2. Comparativa de Arquitectura

| Componente | Proyektor Original | Nuevo Proyektor Open (Node.js) |
| :--- | :--- | :--- |
| **Backend / Servidor** | NekoVM (`neko.exe` + `nekotools.exe` + `index.n` binario de 905 KB). | `server.js` en Node.js nativo (código limpio, legible y documentado). |
| **Acceso al Código Fuente** | Código cerrado (compilado desde Haxe a bytecode). | **100% Código Abierto** (JavaScript estándar). |
| **Dependencias Externas** | Requiere librerías binarias de Windows (`neko.dll`, `std.ndll`, VC++ Runtimes). | **Cero dependencias externas**: corre directo con Node.js sin necesidad de `npm install`. |
| **Frontend / Interfaz** | Incrustada en el binario; inaccesible para edición de plantillas. | Extraída en `public/` (`index.html`, `js/motor.js`, `css/css.css`, imágenes y fuentes). |
| **Búsqueda Bíblica** | Búsqueda por archivo en disco. | **Caché en memoria** + descompresión ZIP nativa ultra rápida (< 50ms para 31,102 versículos). |
| **Streaming de Video** | Manejo básico por `nekotools`. | **Soporte completo de `Range` (HTTP 206)** para reproducción y bucles de video fluidos. |
| **Lanzadores** | `Proyektor.bat` y `Proyektor.vbs` acoplados a matar `neko.exe`. | `iniciar.bat`, `iniciar_sin_consola.vbs` y `detener.bat` con detección inteligente de navegador (Chrome y Edge). |

---

## 3. Estructura del Proyecto

```text
Proyektor - 64Bits/
├── server.js                 # Servidor backend principal en Node.js (Open Source)
├── iniciar.bat               # Script de inicio con ventana de consola
├── iniciar_sin_consola.vbs   # Script de inicio silencioso en segundo plano
├── detener.bat               # Script para cerrar el servidor de forma segura
├── DOCUMENTACION.md          # Esta documentación técnica
│
├── public/                   # Frontend editable (HTML, JS, CSS, Assets)
│   ├── index.html            # Estructura principal de la aplicación
│   ├── visor.html            # Pantalla de proyección hacia el segundo monitor
│   ├── js/
│   │   ├── motor.js          # Lógica principal de Proyektor (4,500+ líneas editables)
│   │   └── engine.js         # Librerías auxiliares (jQuery, Materialize, TaffyDB, ef.js)
│   ├── css/
│   │   ├── css.css           # Estilos personalizados y tema visual
│   │   ├── material.css      # Framework Materialize
│   │   ├── animate.css       # Animaciones visuales
│   │   └── font/             # Tipografías (.woff2)
│   └── img/                  # Iconos, logos y presentaciones
│
├── cancioneros/              # Archivos .js con los cantos (editables directamente)
│   ├── Canciones.js
│   ├── Corario IPUC castilla.js
│   ├── Himnario Lluvias de Bendicion.js
│   ├── Infantiles.js
│   ├── Manantial de Inspiracion.js
│   └── Mi Cancionero.js
│
├── biblias/                  # Archivos .bi (paquetes ZIP con versículos delimitados por |)
│   └── Reina Valera 1960 - RV1960.bi
│
├── fondos/                   # Videos e imágenes de fondo
│   ├── Biblias/
│   ├── Colores/
│   ├── Favoritos/
│   └── Videos/
│
├── data/                     # Avisos, notas y configuraciones
│   └── Pantallas/
│       └── principal.txt
│
└── neko/                     # Archivos originales heredados (respaldados intactos)
    ├── db                    # Base de datos JSON de configuraciones
    ├── index.n               # Binario original de Neko
    └── ...
```

---

## 4. Implementaciones y Adaptaciones Técnicas

### A. Servidor HTTP Nativo de Alto Rendimiento (`server.js`)
* Desarrollado enteramente con los módulos `http`, `fs`, `path`, `url` y `zlib` de Node.js.
* No requiere instalar paquetes vía `npm`: cualquier equipo con Node.js instalado lo ejecuta instantáneamente.
* Soporta llamadas CORS completas (`Access-Control-Allow-Origin: *`) para habilitar control remoto desde otros dispositivos o tablets en la misma red local.

### B. Motor Bíblico con Caché en Memoria
* Las versiones de la Biblia (`.bi`) son en realidad archivos ZIP que contienen un archivo de texto con el formato `Libro|Capítulo|Versículo|Texto`.
* El nuevo servidor lee la cabecera ZIP nativamente con `node:zlib.inflateRawSync` sin descompresores externos.
* Mantiene un caché en memoria `bibleCache`: una vez leída la versión por primera vez, las búsquedas subsecuentes se realizan en milisegundos.
* Se implementó normalización de texto NFD (`normalizeText`) para eliminar tildes y diacríticos, permitiendo encontrar versículos aunque el operador escriba sin acentos.

### C. Persistencia y CRUD de Canciones
* Cuando el usuario edita, añade o borra canciones desde la interfaz web, Proyektor envía una petición `POST /?data`.
* El servidor Node.js parsea el archivo JavaScript correspondiente en `cancioneros/<nombre>.js`, actualiza el array `var jscanciones = [...]` y lo guarda en disco preservando el formato original.

### D. Streaming y Soporte de Fondos de Video (`Range: bytes=X-Y`)
* Los fondos en bucle (`fondos/Videos/`) requieren que el navegador pueda realizar peticiones de rango HTTP 206 (`Partial Content`).
* En el código original de NekoVM, los videos apuntaban a puertos auxiliares inexistentes (7778–7787). Se adaptó `public/js/motor.js` para enrutar todas las solicitudes multimedia directamente al puerto activo del servidor (7777).
* `server.js` gestiona tanto las rutas directas (`/fondos/Videos/...`) como las peticiones de parámetros (`?img=../fondos/...`), permitiendo que los videos se previsualicen en la cuadrícula y se proyecten sin interrupciones.

### E. Hidratación y Persistencia de Datos (Favoritos, Notas y Ajustes)
* Proyektor utiliza TaffyDB y `window.localStorage` para almacenar la lista de canciones favoritas (`taffy_favor`), notas (`nota1`, `nota2`, etc.), anuncios y la configuración de color/fuente (`taffy_settings`).
* El servidor Node.js inyecta automáticamente un script de hidratación al entregar `index.html`, poblando el almacenamiento local con los datos guardados en `neko/db` y `data/db_backup.json`.
* Al cerrar la sesión, la función `actdb` envía `POST /?db`, guardando instantáneamente las modificaciones en disco.

### F. Conmutador Rápido de Modo Oscuro / Modo Claro e Independencia de Colores
* Proyektor incluye múltiples temas visuales: el tema clásico **Base / Modo Claro** (Azul Proyektor `#003366`), el **Modo Oscuro** (`black-dark.css`) y más de 15 variantes cromáticas adicionales (azul, verde, púrpura, naranja, etc.).
* **Botón de Acceso Directo (🌙 / ☀️):** Se agregó un conmutador rápido integrado en la barra de navegación superior. Permite alternar entre Modo Claro y Modo Oscuro con un solo clic.
* **Independencia de Color de Contorno:** En el diseño anterior, cambiar el color del entorno en la paleta desactivaba forzosamente el modo oscuro. Se desacopló la lógica en [`public/js/motor.js`](file:///c:/Users/lokya/Desktop/Proyektor%20-%2064Bits/public/js/motor.js) para que el usuario pueda elegir cualquier color de barra (naranja, azul, verde, etc.) y la aplicación **mantenga estrictamente el modo activo** (permanece en Modo Oscuro si estaba oscuro, o en Modo Claro si estaba claro).
* **Memoria de Preferencia:** El sistema recuerda automáticamente tanto el color de contorno como el estado de modo oscuro en `localStorage` y en la base de datos local `neko/db` y `data/db_backup.json`, persistiendo la combinación entre reinicios.

### G. Selector y Vista Previa en Vivo de Fuentes Tipográficas (UX Mejorado)
* **Causa del fallo original:** En la plantilla antigua de Neko (`index.n`), la lista de fuentes se inyectaba mediante un bucle de servidor cerrado (`::foreach fonts::`). Al extraer el HTML estático, la etiqueta `<select id="fuente">` quedó vacía.
* **Solución y Rediseño de UX:**
  * Se poblaron las 9 fuentes disponibles en el sistema con nombres legibles y notas descriptivas de estilo: **Quicksand** (Redondeada / Moderna), **Raleway** (Elegante / Fina), **Roboto** (Limpia), **Lato** (Clásica), **Dosis** (Estilizada / Alta), **Oregano** (Manuscrita Casual), **Kaushan Script** (Cursiva Dinámica), **Tangerine** (Caligráfica Artística) y **Atami** (Geométrica).
  * **Caja de Vista Previa en Vivo:** Se añadió una caja interactiva bajo el selector con texto de muestra (*"Porque Dios es Bueno"*). Esta caja refleja en tiempo real la tipografía seleccionada, el estado de negrita, el color de letra y la sombra elegida. Además, es editable con un clic para que el usuario escriba cualquier texto que desee probar.
  * **Botones de Navegación Rápida (`◀` / `▶`):** Permiten al usuario alternar entre fuentes sucesivamente sin necesidad de abrir el menú desplegable cada vez.
  * Se enlazaron las 9 hojas de estilo de fuentes en el encabezado de `public/index.html` para garantizar una carga instantánea.

### H. Compatibilidad de Rutas Heredadas
* Para garantizar que ninguna funcionalidad visual se rompa, el servidor responde tanto a las rutas limpias modernas (`/js/motor.js`, `/css/css.css`, `/logo.png`) como a los parámetros antiguos del backend de Neko (`/?f=motor.js&t=j`, `/?f=css&t=c`, `/?f=logo&t=p`).

---

## 5. Guía de Uso

### Iniciar la aplicación
* **Con consola visible:** Haz doble clic en `iniciar.bat`.
* **Silencioso (sin ventana negra):** Haz doble clic en `iniciar_sin_consola.vbs`.

El script detectará automáticamente Google Chrome o Microsoft Edge y abrirá Proyektor en modo pantalla de aplicación en `http://localhost:7777/`.

### Detener la aplicación
* Haz doble clic en `detener.bat`. Esto liberará el puerto 7777 y cerrará el proceso del servidor.

### Cómo modificar la interfaz
* **Para cambiar estilos, colores o tipografías:** Edita `public/css/css.css` o añade fuentes en `public/css/font/`.
* **Para cambiar la estructura de botones o ventanas:** Edita `public/index.html` o `public/visor.html`.
* **Para cambiar funciones, atajos de teclado o lógica de control:** Edita `public/js/motor.js`.
* **Para añadir nuevas canciones:** Puedes hacerlo desde el botón "+" en la propia interfaz de Proyektor, o editando directamente los archivos `.js` en `cancioneros/`.
