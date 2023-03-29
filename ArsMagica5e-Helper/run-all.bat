tasklist /fi "imagename eq mongod.exe" | find /i "mongod.exe"
pause
if errorlevel 1 (
   start mongod.exe.lnk
) else (
	echo MongoDB is running...
)


cd server
start cmd.exe /k "node server.js"

cd ../client
call npm start