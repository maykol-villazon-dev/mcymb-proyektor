@echo off
title MCyMB Open Server (Node.js)

REM 1. Verificar si Node.js esta instalado
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado o no se encuentra en el PATH.
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM 2. Cerrar procesos previos en el puerto 7777 si existen
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :7777 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)

REM 3. Iniciar el servidor Node.js en proceso independiente
start "ProyektorServer" /min node server.js

REM 4. Breve espera para que el servidor este listo
ping 127.0.0.1 -n 3 > nul

REM 5. Detectar Google Chrome o Microsoft Edge en modo app
set "BROWSER="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
) else if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER=%LocalAppData%\Google\Chrome\Application\chrome.exe"
)

if defined BROWSER (
    start "" "%BROWSER%" --allow-file-access-from-files --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-breakpad --disable-client-side-phishing-detection --disable-default-apps --disable-dev-shm-usage --disable-infobars --disable-extensions --disable-features=site-per-process --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --disable-sync --disable-translate --metrics-recording-only --no-first-run --no-default-browser-check --safebrowsing-disable-auto-update --app="http://localhost:7777/"
) else (
    where msedge >nul 2>&1
    if %errorlevel% equ 0 (
        start "" msedge --app="http://localhost:7777/"
    ) else (
        start http://localhost:7777/
    )
)

exit
