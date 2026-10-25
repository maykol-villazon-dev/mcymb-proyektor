/**
 * ============================================================================
 * PROYEKTOR OPEN SERVER (Node.js)
 * Servidor Backend Open Source para Proyektor
 * ============================================================================
 * 
 * Reemplazo 100% libre y abierto para NekoVM (index.n).
 * No requiere 'npm install' ni dependencias externas; funciona con la librería
 * estándar de Node.js (http, fs, path, url, zlib).
 * 
 * Desarrollado para mantener total compatibilidad con la interfaz de Proyektor,
 * sus cancioneros (.js), biblias (.bi), fondos de video/imagen y configuraciones.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');
const querystring = require('querystring');

const PORT = process.env.PORT || 7777;
const BASE_DIR = __dirname;
const PUBLIC_DIR = path.join(BASE_DIR, 'public');
const CANCIONEROS_DIR = path.join(BASE_DIR, 'cancioneros');
const BIBLIAS_DIR = path.join(BASE_DIR, 'biblias');
const FONDOS_DIR = path.join(BASE_DIR, 'fondos');
const DATA_DIR = path.join(BASE_DIR, 'data');
const NEKO_DIR = path.join(BASE_DIR, 'neko');

// Tabla de Tipos MIME
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain; charset=utf-8',
    '.bi': 'application/octet-stream'
};

// Cache de Biblias en memoria para búsquedas instantáneas
const bibleCache = new Map();

/**
 * Lee y descomprime archivos de biblia (.bi) que son paquetes ZIP
 */
function loadBible(versionName) {
    let cleanName = versionName.trim();
    if (!cleanName.endsWith('.bi')) {
        cleanName += '.bi';
    }
    
    if (bibleCache.has(cleanName)) {
        return bibleCache.get(cleanName);
    }

    const biPath = path.join(BIBLIAS_DIR, cleanName);
    if (!fs.existsSync(biPath)) {
        console.error(`[Biblia] No se encontró el archivo: ${biPath}`);
        return null;
    }

    try {
        const data = fs.readFileSync(biPath);
        let textContent = '';

        const pkIdx = data.indexOf(Buffer.from([0x50, 0x4B, 0x03, 0x04]));
        if (pkIdx !== -1) {
            const method = data.readUInt16LE(pkIdx + 8);
            const compSize = data.readUInt32LE(pkIdx + 18);
            const fnLen = data.readUInt16LE(pkIdx + 26);
            const extraLen = data.readUInt16LE(pkIdx + 28);
            const fileDataOffset = pkIdx + 30 + fnLen + extraLen;
            const compressedData = data.subarray(fileDataOffset, fileDataOffset + compSize);

            if (method === 8) {
                textContent = zlib.inflateRawSync(compressedData).toString('utf-8');
            } else if (method === 0) {
                textContent = compressedData.toString('utf-8');
            }
        } else {
            textContent = data.toString('utf-8');
        }

        const lines = textContent.split(/\r?\n/).filter(l => l.trim().length > 0);
        const verses = [];
        for (let i = 0; i < lines.length; i++) {
            const parts = lines[i].split('|');
            if (parts.length >= 4) {
                verses.push({
                    lib: parseInt(parts[0], 10),
                    cap: parseInt(parts[1], 10),
                    ver: parseInt(parts[2], 10),
                    tex: parts.slice(3).join('|')
                });
            }
        }

        console.log(`[Biblia] Cargada '${cleanName}': ${verses.length} versículos.`);
        bibleCache.set(cleanName, verses);
        return verses;
    } catch (err) {
        console.error(`[Biblia] Error al leer ${cleanName}:`, err);
        return null;
    }
}

/**
 * Normaliza y elimina tildes para búsquedas flexibles
 */
function normalizeText(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Sirve archivos estáticos con soporte completo para streaming (Range)
 */
function serveStaticFile(req, res, filePath) {
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Archivo no encontrado');
        return;
    }

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
        const indexPath = path.join(filePath, 'index.html');
        if (fs.existsSync(indexPath)) {
            return serveStaticFile(req, res, indexPath);
        }
        res.writeHead(403);
        res.end('Acceso denegado');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const range = req.headers.range;

    // Soporte para streaming de video (HTTP 206 Partial Content)
    if (range && (ext === '.mp4' || ext === '.webm')) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${stat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': contentType
        });
        fileStream.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': stat.size,
            'Content-Type': contentType,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        fs.createReadStream(filePath).pipe(res);
    }
}

/**
 * Procesa el cuerpo de peticiones POST
 */
function parseRequestBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const trimmed = body.trim();
            // Si el cuerpo es una cadena JSON válida (objeto o arreglo), parsearlo directamente
            if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                try {
                    return resolve(JSON.parse(trimmed));
                } catch (e) {
                    // Continuar con otros métodos si falla
                }
            }
            const contentType = req.headers['content-type'] || '';
            if (contentType.includes('application/json')) {
                try {
                    resolve(JSON.parse(body));
                } catch {
                    resolve({});
                }
            } else {
                resolve(querystring.parse(body));
            }
        });
    });
}

/**
 * Servidor HTTP Principal
 */
const server = http.createServer(async (req, res) => {
    // Habilitar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // =========================================================================
    // 1. MANEJO DE RUTAS API (QUERY PARAMETERS)
    // =========================================================================

    // A. Listado de Cancioneros: GET /?data=can
    if (query.data === 'can') {
        try {
            const files = fs.readdirSync(CANCIONEROS_DIR)
                .filter(f => f.endsWith('.js'))
                .map(f => ({ n: path.basename(f, '.js') }));
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(files));
        } catch (e) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify([]));
        }
        return;
    }

    // B. Listado de Biblias: GET /?biblias
    if ('biblias' in query && req.method === 'GET') {
        try {
            const files = fs.readdirSync(BIBLIAS_DIR)
                .filter(f => f.endsWith('.bi'))
                .map(f => ({
                    n: path.basename(f, '.bi'),
                    ti: 'bi'
                }));
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(files));
        } catch (e) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify([]));
        }
        return;
    }

    // B2. Notas de actualización: GET /?ver
    if ('ver' in query && req.method === 'GET') {
        const verPath = path.join(PUBLIC_DIR, 'ver.html');
        if (fs.existsSync(verPath)) {
            return serveStaticFile(req, res, verPath);
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h5>Proyektor Open</h5>');
        return;
    }

    // C. Manejo de Imágenes y Fondos: GET /?imagenes=...
    if ('imagenes' in query) {
        const imgType = query.imagenes;

        // Directorios dentro de fondos: ?imagenes=dirs
        if (imgType === 'dirs') {
            try {
                const dirs = fs.readdirSync(FONDOS_DIR)
                    .filter(f => fs.statSync(path.join(FONDOS_DIR, f)).isDirectory())
                    .map(d => ({ n: d }));
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(dirs));
            } catch (e) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify([]));
            }
            return;
        }

        // Listar contenido de una carpeta: ?imagenes=l&l=...
        if (imgType === 'l' || query.l) {
            let targetDir = query.l || '';
            targetDir = targetDir.replace(/^\.\.\/fondos\/?/, '').replace(/^fondos\/?/, '');
            const fullDirPath = path.join(FONDOS_DIR, targetDir);

            try {
                if (fs.existsSync(fullDirPath)) {
                    const files = fs.readdirSync(fullDirPath);
                    const list = [];
                    for (const f of files) {
                        const ext = path.extname(f).toLowerCase();
                        const isVideo = ['.mp4', '.webm', '.ogv', '.ogg'].includes(ext);
                        const isImg = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'].includes(ext);
                        if (isVideo || isImg) {
                            const relPath = `../fondos/${targetDir}/${f}`.replace(/\/+/g, '/');
                            list.push({
                                n: f,
                                i: relPath,
                                m: isVideo ? 'v' : 'i',
                                tum: relPath,
                                s: 0
                            });
                        }
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify(list));
                    return;
                }
            } catch (e) {
                console.error('[Imagenes] Error al listar directorio:', e);
            }
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify([]));
            return;
        }

        // Obtener video por defecto: ?imagenes=v
        if (imgType === 'v') {
            const vidDir = path.join(FONDOS_DIR, 'Videos');
            let videoUrl = '';
            if (fs.existsSync(vidDir)) {
                const vids = fs.readdirSync(vidDir).filter(f => ['.mp4', '.webm'].includes(path.extname(f).toLowerCase()));
                if (vids.length > 0) {
                    videoUrl = `/fondos/Videos/${vids[0]}`;
                }
            }
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ i: videoUrl }));
            return;
        }

        // Obtener imagen por defecto: ?imagenes=i
        if (imgType === 'i') {
            const colDir = path.join(FONDOS_DIR, 'Colores');
            let imgUrl = '';
            if (fs.existsSync(colDir)) {
                const imgs = fs.readdirSync(colDir).filter(f => ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(f).toLowerCase()));
                if (imgs.length > 0) {
                    imgUrl = `/fondos/Colores/${imgs[0]}`;
                }
            }
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ i: imgUrl }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify([]));
        return;
    }

    // D. Peticiones Bíblicas: POST /?biblia
    if ('biblia' in query && req.method === 'POST') {
        const body = await parseRequestBody(req);
        const version = body.version || 'Reina Valera 1960 - RV1960';
        const verses = loadBible(version);

        if (!verses) {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(null));
            return;
        }

        // 1. Obtener capítulo completo
        if (body.capitulo && body.libro) {
            const libNum = parseInt(body.libro, 10);
            const capNum = parseInt(body.capitulo, 10);
            const chapterVerses = verses.filter(v => v.lib === libNum && v.cap === capNum);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(chapterVerses));
            return;
        }

        // 2. Búsqueda por texto (palabras clave)
        if (body.buscar) {
            const rawSearch = normalizeText(body.buscar);
            const searchWords = rawSearch.split(/\s+/).filter(w => w.length > 0);
            const parte = body.parte || '0';

            const filtered = verses.filter(v => {
                // Filtro Antiguo / Nuevo Testamento
                if (parte === 'AT' && v.lib > 39) return false;
                if (parte === 'NT' && v.lib <= 39) return false;

                const normTex = normalizeText(v.tex);
                return searchWords.every(word => normTex.includes(word));
            });

            // Limitar a los primeros 250 versículos para rendimiento
            const results = filtered.slice(0, 250);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(results.length > 0 ? results : null));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(null));
        return;
    }

    // E. Guardar / Editar Canciones: POST /?data
    if ('data' in query && req.method === 'POST') {
        const body = await parseRequestBody(req);
        const cancioneroName = body.name ? body.name.replace(/\.js$/, '') : 'Canciones';
        const cancioneroPath = path.join(CANCIONEROS_DIR, `${cancioneroName}.js`);

        try {
            let songs = [];
            if (fs.existsSync(cancioneroPath)) {
                const content = fs.readFileSync(cancioneroPath, 'utf-8');
                const jsonMatch = content.match(/var\s+jscanciones\s*=\s*(\[[\s\S]*?\]);?/);
                if (jsonMatch) {
                    try {
                        songs = JSON.parse(jsonMatch[1]);
                    } catch {
                        songs = eval(jsonMatch[1]);
                    }
                }
            }

            if (body.borrar) {
                // Borrar canción por ID
                const deleteId = String(body.borrar);
                songs = songs.filter(s => String(s.id) !== deleteId);
                console.log(`[Canciones] Eliminada canción id=${deleteId} en ${cancioneroName}`);
            } else if (body.ti && body.le) {
                // Añadir o actualizar canción
                const existingIdx = songs.findIndex(s => String(s.id) === String(body.id));
                const songData = {
                    id: body.id ? parseInt(body.id, 10) : (songs.length > 0 ? Math.max(...songs.map(s => parseInt(s.id, 10) || 0)) + 1 : 1),
                    ti: body.ti,
                    le: body.le,
                    tono: body.tono || 'C',
                    estilo: body.estilo || '0',
                    name: `${cancioneroName}.js`
                };

                if (existingIdx !== -1) {
                    songs[existingIdx] = songData;
                    console.log(`[Canciones] Actualizada canción '${songData.ti}' en ${cancioneroName}`);
                } else {
                    songs.push(songData);
                    console.log(`[Canciones] Añadida nueva canción '${songData.ti}' en ${cancioneroName}`);
                }
            }

            const outputJs = `var jscanciones = ${JSON.stringify(songs, null, 2)};\n`;
            fs.writeFileSync(cancioneroPath, outputJs, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true }));
        } catch (err) {
            console.error('[Canciones] Error guardando canción:', err);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // F. Base de Datos / Configuración: POST /?db
    if ('db' in query && req.method === 'POST') {
        const body = await parseRequestBody(req);
        try {
            const dbPath = path.join(NEKO_DIR, 'db');
            const backupPath = path.join(DATA_DIR, 'db_backup.json');
            const jsonStr = typeof body === 'string' ? body : JSON.stringify(body, null, 2);
            fs.writeFileSync(dbPath, jsonStr, 'utf-8');
            fs.writeFileSync(backupPath, jsonStr, 'utf-8');
            console.log('[DB] Base de datos guardada con éxito en neko/db y data/db_backup.json');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true }));
        } catch (e) {
            console.error('[DB] Error guardando base de datos:', e);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
    }

    // G. Guardar notas de pantalla: POST /?archivotexto
    if ('archivotexto' in query && req.method === 'POST') {
        const body = await parseRequestBody(req);
        try {
            const pantalla = body.pantalla || 'principal';
            const textPath = path.join(DATA_DIR, 'Pantallas', `${pantalla}.txt`);
            fs.mkdirSync(path.dirname(textPath), { recursive: true });
            fs.writeFileSync(textPath, body.text || '', 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true }));
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: e.message }));
        }
        return;
    }

    // H. Compatibilidad con parámetros antiguos: /?f=...&t=...
    if (query.f && query.t) {
        let reqFile = query.f;
        const reqType = query.t;

        const extMap = {
            'c': '.css',
            'j': '.js',
            'p': '.png',
            'g': '.gif',
            'w': '.woff2',
            'h': '.html',
            'jp': '.jpg'
        };

        const targetExt = extMap[reqType] || '';
        let targetFileName = reqFile.includes('.') ? reqFile : `${reqFile}${targetExt}`;

        // Buscar en public con prioridad en subcarpetas editables (js, css)
        const candidatePaths = [
            path.join(PUBLIC_DIR, 'js', targetFileName),
            path.join(PUBLIC_DIR, 'css', targetFileName),
            path.join(PUBLIC_DIR, targetFileName),
            path.join(PUBLIC_DIR, 'img', targetFileName),
            path.join(PUBLIC_DIR, 'font', targetFileName)
        ];

        for (const cp of candidatePaths) {
            if (fs.existsSync(cp)) {
                return serveStaticFile(req, res, cp);
            }
        }
    }

    // =========================================================================
    // 2. SERVICIO DE ARCHIVOS ESTÁTICOS Y MULTIMEDIA
    // =========================================================================

    // Parámetro ?img=... para reproducción de fondos e imágenes
    if (query.img) {
        let cleanImg = query.img.replace(/^\.\.\//, '').replace(/^fondos\/?/, '');
        const imgPath = path.join(FONDOS_DIR, decodeURIComponent(cleanImg));
        if (fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
            return serveStaticFile(req, res, imgPath);
        }
    }

    // Raíz: / -> index.html (con hidratación de localStorage desde neko/db)
    if (pathname === '/' || pathname === '/index.html') {
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        try {
            let html = fs.readFileSync(indexPath, 'utf-8');
            
            // Cargar base de datos persistida (favoritos, notas, anuncios, ajustes)
            let dbData = {};
            const dbPath = path.join(NEKO_DIR, 'db');
            const backupPath = path.join(DATA_DIR, 'db_backup.json');
            
            if (fs.existsSync(dbPath)) {
                try {
                    dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
                } catch(e) {
                    console.error('[DB] Error leyendo neko/db:', e);
                }
            }
            if (Object.keys(dbData).length === 0 && fs.existsSync(backupPath)) {
                try {
                    dbData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
                } catch(e) {
                    console.error('[DB] Error leyendo data/db_backup.json:', e);
                }
            }

            const hydrationScript = `
<script id="proyektor-hydration">
(function() {
    try {
        var db = ${JSON.stringify(dbData)};
        for (var k in db) {
            var cur = localStorage.getItem(k);
            // Restaurar si no existe, si está vacío, o para notas, favoritos y ajustes
            if (!cur || cur === 'null' || cur === '[]' || cur === '""' || k.startsWith('nota') || k.startsWith('anuncio') || k === 'taffy_favor' || k === 'taffy_settings' || k === 'taffy_biblias' || k === 'proyektor_dark_mode') {
                var val = db[k];
                localStorage.setItem(k, typeof val === 'object' ? JSON.stringify(val) : val);
            }
        }
    } catch(e) {
        console.error('[Hydration] Error hidratando localStorage:', e);
    }
})();
</script>
`;
            if (html.includes('<head>')) {
                html = html.replace('<head>', '<head>' + hydrationScript);
            } else {
                html = hydrationScript + html;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-cache'
            });
            res.end(html);
            return;
        } catch (err) {
            console.error('[Server] Error sirviendo index.html:', err);
            return serveStaticFile(req, res, indexPath);
        }
    }

    // Fondos: /fondos/...
    if (pathname.startsWith('/fondos/')) {
        const rel = pathname.replace(/^\/fondos\//, '');
        const target = path.join(FONDOS_DIR, decodeURIComponent(rel));
        return serveStaticFile(req, res, target);
    }

    // Cancioneros: /cancioneros/...
    if (pathname.startsWith('/cancioneros/')) {
        const rel = pathname.replace(/^\/cancioneros\//, '');
        const target = path.join(CANCIONEROS_DIR, decodeURIComponent(rel));
        return serveStaticFile(req, res, target);
    }

    // Data: /data/...
    if (pathname.startsWith('/data/')) {
        const rel = pathname.replace(/^\/data\//, '');
        const target = path.join(DATA_DIR, decodeURIComponent(rel));
        return serveStaticFile(req, res, target);
    }

    // Búsqueda directa de videos o imágenes en fondos por nombre de archivo
    const baseName = path.basename(pathname);
    const baseExt = path.extname(baseName).toLowerCase();
    if (['.mp4', '.webm', '.ogv', '.ogg', '.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(baseExt)) {
        const candidateVid = path.join(FONDOS_DIR, 'Videos', decodeURIComponent(baseName));
        if (fs.existsSync(candidateVid) && fs.statSync(candidateVid).isFile()) {
            return serveStaticFile(req, res, candidateVid);
        }
        const candidateCol = path.join(FONDOS_DIR, 'Colores', decodeURIComponent(baseName));
        if (fs.existsSync(candidateCol) && fs.statSync(candidateCol).isFile()) {
            return serveStaticFile(req, res, candidateCol);
        }
    }

    // Archivos directos en public/ (prioridad a js/ y css/ si existen, luego raíz)
    const reqRelPath = decodeURIComponent(pathname.slice(1));
    const directCandidates = [
        path.join(PUBLIC_DIR, 'js', reqRelPath),
        path.join(PUBLIC_DIR, 'css', reqRelPath),
        path.join(PUBLIC_DIR, reqRelPath)
    ];
    for (const dPath of directCandidates) {
        if (fs.existsSync(dPath) && !fs.statSync(dPath).isDirectory()) {
            return serveStaticFile(req, res, dPath);
        }
    }

    // Si no coincide, intentar 404
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Ruta no encontrada');
});

server.listen(PORT, () => {
    console.log('====================================================');
    console.log('  MCyMB OPEN SERVER (Node.js) INICIADO');
    console.log(`  URL Principal: http://localhost:${PORT}/`);
    console.log('====================================================');
});
