const http = require('http');
const fs = require('fs');
const path = require('path');

const requestHandle = (router, handle) => (request, response) => {
  router(handle, request, response);
};

// 开启服务
const startServer = (args = {}) => {
  const { onRequest = requestHandle, router, handle, port = 3000, host = '127.0.0.1' } = args;
  // 创建一个简单的服务器
  const server = http.createServer(onRequest(router, handle));
  server.listen(port, host);
  console.log('🚀 ~ file: server start on localhost:3000');

  server.on('error', (e) => {
    console.log('🚀 ~ file: server.js ~ line 18 ~ server.on ~ e', e);
    // 另一个服务器已正在监听请求的 port/path/handle
    if (e.code === 'EADDRINUSE') {
      console.log('地址正被使用，重试中...');
      setTimeout(() => {
        server.close();
        server.listen(port, host);
      }, 1000);
    }
  });

  return { server, args };
};
// 停止服务
const closeServer = (server, cb) => {
  server.close((a, b, c) => {
    console.log(a, b, c);
    cb();
  });
};

module.exports = {
  startServer,
  closeServer,
  // 重启服务
  restartServer: (server, args) => {
    closeServer(server, () => startServer(args));
  },
};
