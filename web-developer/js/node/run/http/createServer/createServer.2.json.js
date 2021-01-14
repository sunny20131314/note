const http = require('http');

const onRequest = (request, response) => {
  console.log('🚀 ~ file: createServer.js ~ line 4 ~ server ~ request', request);
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });

  const json = {
    name: 'joy',
    age: 20,
  };
  response.write(JSON.stringify(json));
  response.end();
};

// 创建一个简单的服务器
const server = http.createServer(onRequest);

// server.listen(3000);
server.listen(3000, '127.0.0.1');

console.log('🚀 ~ file: server start on localhost:3000');
