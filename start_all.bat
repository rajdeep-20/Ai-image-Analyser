@echo off
echo Starting All Services...

set PROJECT_PATH=R:\personal\ai-image-analyser

REM Start ML Service
start "ML Service" cmd /k "cd /d %PROJECT_PATH%\ml-service && venv\Scripts\activate && uvicorn main:app --host 0.0.0.0 --port 8001"

REM Start Backend Service
start "Backend Service" cmd /k "cd /d %PROJECT_PATH%\backend && npm start"

REM Start Frontend Service
start "Frontend Service" cmd /k "cd /d %PROJECT_PATH%\frontend && npm run dev"

echo All services are launching in new windows.