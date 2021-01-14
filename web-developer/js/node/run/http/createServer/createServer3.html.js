const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname + '/index.html');
console.log('🚀 ~ file: createServer.2.html.js ~ line 6 ~ htmlPath', htmlPath);
const onRequest = (request, response) => {
  console.log(
    '🚀 ~ file: createServer.3.html.js ~ line 8 ~ onRequest ~ request',
    request.url,
    request.headers,
    request.headers.accept
  );

  response.writeHead(200, {
    'Content-Type': 'text/html',
  });

  const readHtml = fs.createReadStream(htmlPath, 'utf8');

  readHtml.pipe(response);
  // response.end('116');
};

// 创建一个简单的服务器
const server = http.createServer(onRequest);

// server.listen(3000);
server.listen(3000, '127.0.0.1');

console.log('🚀 ~ file: server start on localhost:3000');
