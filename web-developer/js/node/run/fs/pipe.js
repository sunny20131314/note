/**
 * stream 的 pipe 写法
 */
const fs = require('fs');
const path = require('path');

const { dirPath, articlePath, articleCopyPath } = require('./constants/path');

const readStream = fs.createReadStream(articlePath);
fs.mkdir(dirPath, { recursive: true }, function () {
  const writeStream = fs.createWriteStream(articleCopyPath);
  writeStream.write('start~~~');

  // note: 回调？
  readStream.pipe(writeStream).on('finish', function (err, data) {
    console.log('🚀 ~ file: pipe.js ~ line 16 ~ err, data', err, data);
    require('./utils').removeDirFile(articleCopyPath, dirPath);
  });
});
