@echo off
echo ========================================
echo   STP Agro Backend - Starting Server
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Node.js version:
node --version

echo.
echo Checking MongoDB connection...
echo Make sure MongoDB is running or update MONGODB_URI in .env
echo.

echo Starting backend server...
echo Server will run on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

node server.js

pause
