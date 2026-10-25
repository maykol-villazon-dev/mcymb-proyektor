@echo off

cd neko

start /B neko.exe Proyektor.n

timeout /t 10 /nobreak > nul

taskkill /F /IM neko.exe > nul  2>&1
