Set WshShell = CreateObject("WScript.Shell")
' Ejecuta iniciar.bat de forma completamente transparente y oculta (0)
WshShell.Run "iniciar.bat", 0, False
