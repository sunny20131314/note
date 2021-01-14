const fs = require('fs');

// 获取文件 html/css/js/png
const getFile = ({ path, encode = 'utf8', contentType }) => (request, response) => {
  console.log(path, encode, contentType, 'path, encode, contentType');
  response.writeHead(200, {
    'Content-Type': contentType,
  });

  const readHtml = fs.createReadStream(path, encode);
  readHtml.pipe(response);
};

module.exports = {
  getFile,
};
