Write-Host "=== 1. Ensuring MongoDB Service is Running ===" -ForegroundColor Cyan
Start-Service -Name "MongoDB" -ErrorAction SilentlyContinue

Write-Host "=== 2. Starting Payload CMS Admin on Port 3001 ===" -ForegroundColor Cyan
$port3001 = Get-NetTCPConnection -LocalPort 3001 -State Listen -ErrorAction SilentlyContinue
if (-not $port3001) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'C:\henotic-payload-cms'; npm run dev -- -p 3001"
}

Write-Host "=== 3. Starting Henotic Diagnostics Next.js Frontend on Port 3000 ===" -ForegroundColor Cyan
$port3000 = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if (-not $port3000) {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'C:\henotic-diagnostics'; npm run dev"
}

Start-Sleep -Seconds 5
Start-Process "http://localhost:3000"
Start-Process "http://localhost:3001/admin"
Write-Host "Both servers are live! Frontend: http://localhost:3000 | Admin: http://localhost:3001/admin" -ForegroundColor Green
