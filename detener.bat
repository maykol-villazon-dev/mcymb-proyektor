@echo off
title Detener Proyektor
chcp 65001 > nul

echo Deteniendo Proyektor en el puerto 7777...

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :7777 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
    echo Proceso %%a terminado.
)

echo Proyektor detenido correctamente.
timeout /t 2 > nul
exit
