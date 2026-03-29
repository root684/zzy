const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')));

// 处理所有未匹配的路由，返回index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动服务器，监听所有网络接口
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('网络访问地址: 在同一网络中的其他设备可以通过本机IP地址访问');
  console.log('例如: http://[本机IP]:3000');
  console.log('按 Ctrl+C 停止服务器');
});
