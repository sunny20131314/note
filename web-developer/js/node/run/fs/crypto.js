const fs = require('fs');
const path = require('path');

const { dirPath, articlePath, articleCopyPath } = require('./constants/path');

// 压缩
const zlib = require('zlib');
// 加密
const crypto = require('crypto');

const pwd = Buffer.from('9vApxLk5G3PAsJrM');
// 'aes-128-cbc' 256
// createCipheriv(加密参数, 16位 pwd, 16位 iv)
const encryptStream = crypto.createCipheriv('aes-128-cbc', pwd, 'abcdefg123456789');
const gzip = zlib.createGzip();

const decryptStream = crypto.createDecipheriv('aes-128-cbc', pwd, 'abcdefg123456789');
const gunzip = zlib.createGunzip();

const readStream = fs.createReadStream(articlePath);
fs.mkdir(dirPath, { recursive: true }, function () {
  const writeStream = fs.createWriteStream(articleCopyPath);

  readStream
    .pipe(encryptStream)
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', function (err, data) {
      console.log('🚀 ~ file: file.js ~ line 46 ~ err, data', err, data);
      const gunzipPath = path.join(articleCopyPath, '../artileCopyGunzip.txt');
      const readStream1 = fs.createReadStream(articleCopyPath);
      const writeStream1 = fs.createWriteStream(gunzipPath);

      // note: 解密的顺序和加密的顺序相反的
      readStream1
        .pipe(gunzip)
        .pipe(decryptStream)
        .pipe(writeStream1)
        .on('finish', function (err, data) {
          require('./utils').removeDirFile([articleCopyPath, gunzipPath], dirPath);
        });
    });
});
