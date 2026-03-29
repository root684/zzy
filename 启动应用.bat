@echo off

:: 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到Node.js。请先安装Node.js。
    echo 下载地址: https://nodejs.org/zh-cn/download/
    pause
    exit /b 1
)

:: 检查npm是否安装
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到npm。请先安装Node.js。
    echo 下载地址: https://nodejs.org/zh-cn/download/
    pause
    exit /b 1
)

:: 启动应用
echo 启动忆小排系统...
echo 请稍候，正在启动服务器...

:: 运行服务器
node server.js
