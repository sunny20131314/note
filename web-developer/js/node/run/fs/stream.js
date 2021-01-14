/**
 * stream
 */
const fs = require('fs');
const path = require('path');

const { dirPath, articlePath, articleCopyPath } = require('./constants/path');

const readStream = fs.createReadStream(articlePath);
fs.mkdir(dirPath, { recursive: true }, function () {
  const writeStream = fs.createWriteStream(articleCopyPath);
  // note: createWriteStream 后可随意写~
  writeStream.write('start~~~');

  let articleData = '';
  readStream.on('data', (chunk) => {
    articleData += chunk;
  });

  readStream.on('end', () => {
    console.log('read end');
    writeStream.write(articleData);
    writeStream.write('end~~~');

    // note: 调用end()后 触发finish
    writeStream.end();
    // note: writeStream.end 之后文件不可 write，如果继续 write, 会报错
    // writeStream.write('end again~~~');
    writeStream.on('finish', () => {
      console.log('write end');
    });

    require('./utils').removeDirFile(articleCopyPath, dirPath);
  });

  writeStream.write('continue~~~');
});
