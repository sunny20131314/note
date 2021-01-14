const http = require('http');

const onRequest = (request, response) => {
  console.log('🚀 ~ file: createServer.js ~ line 4 ~ server ~ request', request);
  response.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  response.write('hello from server \n');
  response.end('hello from server');
};

// 创建一个简单的服务器
const server = http.createServer(onRequest);

// server.listen(3000);
server.listen(3000, '127.0.0.1');

console.log('🚀 ~ file: server start on localhost:3000');
