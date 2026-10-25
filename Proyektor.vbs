set taskmgr = GetObject("winmgmts:{impersonationLevel=impersonate}").ExecQuery ("select * from Win32_Process")

For each process in taskmgr
 
If Lcase(process.name) = "neko.exe"  or Lcase(process.name) = "nekotools.exe"   then
	Process.terminate
End If
Next
WScript.Sleep 1000

CreateObject("WScript.Shell").Popup "Iniciando Proyektor" + chr(13) + chr(13) + "Espere Por Favor",1 , "Proyektor",vbInformation

Set WshShell = WScript.CreateObject("WScript.Shell")
Return = WshShell.Run("Proyektor.bat", 0, true)
