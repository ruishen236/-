@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo 请先安装 Node.js LTS，然后重新运行本文件：https://nodejs.org/
  pause
  exit /b 1
)
echo 正在安装或检查依赖，请稍候...
call npm.cmd install
if errorlevel 1 (
  echo 安装未完成，请检查上方错误信息和网络连接。
  pause
  exit /b 1
)
echo 正在启动网站，浏览器将自动打开。保持本窗口运行，结束时按 Ctrl+C。
call npm.cmd run dev -- --open
pause
