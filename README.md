<div align="center">

# MCyMB-Proyektor 📽️✨
### Sistema Abierto de Proyección Multimedia, Biblias y Cancioneros para Iglesias

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Offline First](https://img.shields.io/badge/Offline-100%25%20Local-blue?style=for-the-badge&logo=signal)](https://github.com/maykol-villazon-dev)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20npm-orange?style=for-the-badge)](https://github.com/maykol-villazon-dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

<br>

<p align="center">
  <b>MCyMB</b> (<i>Movimiento Cristiano y Misionero Boliviano</i>) es una plataforma de proyección multimedia moderna, libre y ultra ligera diseñada para operadores de iglesia, equipos de alabanza y ministerios congregacionales.
</p>

[Características](#-características-principales) •
[Instalación y Uso](#-inicio-rápido) •
[Arquitectura](#-arquitectura-técnica) •
[Atajos de Teclado](#-control-y-atajos) •
[Autor](#-autor-y-créditos)

---

</div>

## 🌟 Resumen del Proyecto

Durante años, las congregaciones han dependido de sistemas de proyección pesados, con suscripciones costosas o cerrados a modificaciones. **MCyMB-Proyektor** nace de una reingeniería completa hacia una **arquitectura abierta en Node.js nativo**, ofreciendo:

- **100% Offline & Portable:** No requiere conexión a Internet para operar en el templo o altar.
- **Cero dependencias npm:** Funciona directamente con los módulos nativos de Node.js (`http`, `fs`, `path`, `zlib`), sin necesidad de ejecutar descargas pesadas de paquetes.
- **Rápido y Eficiente:** Búsqueda en miles de versículos bíblicos en menos de 50 ms mediante caché en memoria y normalización de texto.
- **Control Dual:** Interfaz de operador completa en una pantalla y Visor limpio e independiente para proyector o pantalla de sala.

---

## 🚀 Características Principales

### 📖 1. Proyección Bíblica con Concordancia
* Búsqueda por palabras clave con concordancia en tiempo real en toda la Biblia, Antiguo Testamento o Nuevo Testamento.
* Lectura directa por Libro, Capítulo y Versículo con cambio fluido con teclado.
* Normalización diacrítica (encuentra versículos con o sin tildes).

### 🎵 2. Cancioneros y Alabanzas Dinámicas
* Múltiples cancioneros integrados y ampliables (`Canciones`, `Himnario Lluvias de Bendición`, `Corario IPUC`, `Manantial de Inspiración`, `Infantiles`, etc.).
* Búsqueda instantánea por título, número o estrofa.
* Sistema de favoritos y edición de canciones directamente desde la interfaz.

### 🖥️ 3. Visor de Proyección Desacoplado
* Ventana secundaria dedicada (`/visor.html`) lista para enviar al segundo monitor o proyector.
* Transiciones animadas, fondos de video en bucle continuo y ajustes tipográficos en caliente.

### 🌙 4. Modo Oscuro & Claro Desacoplados
* Conmutador de modo oscuro optimizado para ambientes de poca luz (cabina de sonido/multimedia).
* Selección de color de contorno (Naranja, Azul, Verde, etc.) independiente del fondo oscuro o claro.

### 🔤 5. Selector Tipográfico en Vivo
* 9 fuentes seleccionadas (Roboto, Lato, Raleway, Dosis, Tangerine, Kaushan Script, Quicksand, Oregano, Atami).
* Controles rápidos (◀ / ▶) y caja de prueba en tiempo real con persistencia en disco.

### 🎬 6. Motor Multimedia y Streaming Local
* Soporte nativo de streaming parcial HTTP 206 (`Range: bytes`) para reproducción continua de videos de fondo (.mp4, .webm).
* Banco de fondos de imágenes y colores sólidos personalizables.

---

## 🛠️ Estructura del Repositorio

```text
MCyMB-Proyektor/
├── server.js                 # Servidor backend en Node.js (Open Source nativo)
├── iniciar.bat               # Lanzador principal en Windows con consola
├── iniciar_sin_consola.vbs   # Lanzador silencioso en segundo plano
├── detener.bat               # Detención segura del servidor
├── DOCUMENTACION.md          # Especificación técnica detallada
├── README.md                 # Guía general del proyecto
│
├── public/                   # Frontend desacoplado y editable
│   ├── index.html            # Consola de control del operador
│   ├── visor.html            # Pantalla de proyección para el proyector
│   ├── js/
│   │   ├── motor.js          # Lógica interactiva de MCyMB
│   │   └── engine.js         # Utilidades y componentes base
│   ├── css/                  # Estilos, temas y tipografías
│   └── img/                  # Logotipos y recursos gráficos
│
├── cancioneros/              # Base de datos de cantos en formato JavaScript
├── biblias/                  # Biblias en formato comprimido (.bi)
├── fondos/                   # Videos y fotografías de fondo
└── data/                     # Persistencia de notas pastorales y avisos
```

---

## ⚡ Inicio Rápido

### Requisitos
* [Node.js](https://nodejs.org/) (Versión 14 o superior).
* Navegador moderno (Google Chrome, Microsoft Edge, Brave o Firefox).

### Pasos de ejecución

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/maykol-villazon-dev/MCyMB-Proyektor.git
   cd MCyMB-Proyektor
   ```

2. **Iniciar la aplicación:**
   * **En Windows:** Haz doble clic en `iniciar.bat` (o `iniciar_sin_consola.vbs` para modo silencioso).
   * **Por terminal (Cualquier SO):**
     ```bash
     node server.js
     ```

3. **Abrir en el navegador:**
   * **Consola del Operador:** `http://localhost:7777/`
   * **Visor de Proyección:** `http://localhost:7777/?f=visor&t=h`

---

## ⌨️ Control y Atajos de Teclado

| Tecla / Acción | Función |
| :--- | :--- |
| **F11** | Alternar pantalla completa en la ventana del visor |
| **Espacio / Flecha Derecha** | Avanzar a la siguiente estrofa o versículo |
| **Flecha Izquierda** | Retroceder a la estrofa o versículo anterior |
| **Escape** | Ocultar texto proyectado / Limpiar pantalla |
| **Enter (en buscador)** | Proyectar de inmediato el primer resultado bíblico |

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT** de código abierto. Eres libre de usarlo, modificarlo y compartirlo en cualquier iglesia, congregación o ministerio sin costo alguno.

---

## 👨‍💻 Autor y Créditos

* **Desarrollador y Mantenedor:** [Maykol Villazon Flores](https://github.com/maykol-villazon-dev)
* **GitHub:** [@maykol-villazon-dev](https://github.com/maykol-villazon-dev)
* **Organización / Identidad:** MCyMB (*Movimiento Cristiano y Misionero Boliviano*)

<div align="center">
  <sub>Distribuido libremente para la edificación y servicio de las congregaciones.</sub>
</div>
