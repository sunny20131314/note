const fs = require('fs');

function removeFile(file, timer) {
  // 移除某文件
  const remove = () =>
    fs.unlink(file, () => {
      console.log('🚀 ~ file: remove.js ~ line 6 ~ fs.unlink ~ file', file);
    });
  timer ? setTimeout(remove, timer) : remove();
}
function removeDir(dir, timer) {
  // rmdirSync
  // 移除文件夹
  const remove = () =>
    fs.rmdir(dir, () => {
      console.log('🚀 ~ file: remove.js ~ line 6 ~ fs.rmdir ~ dir', dir);
    });
  timer ? setTimeout(remove, timer) : remove();
}

const aesjs = require('aes-js');
// [记一次在node.js中使用crypto的createCipheriv方法进行加密时所遇到的坑](https://www.cnblogs.com/jaxu/p/11649131.html)
// 以下这段代码要求加密的数据是16位
function encryptByAes(key, iv, data) {
  let aesCbc = new aesjs.ModeOfOperation.cbc(
    aesjs.utils.utf8.toBytes(key),
    aesjs.utils.utf8.toBytes(iv)
  );
  let encryptedBytes = aesCbc.encrypt(aesjs.utils.utf8.toBytes(data));
  return aesjs.utils.hex.fromBytes(encryptedBytes);
}

function decryptByAes(key, iv, crypted) {
  let aesCbc = new aesjs.ModeOfOperation.cbc(
    aesjs.utils.utf8.toBytes(key),
    aesjs.utils.utf8.toBytes(iv)
  );
  let encryptedBytes = aesCbc.decrypt(aesjs.utils.hex.toBytes(crypted));
  return aesjs.utils.utf8.fromBytes(encryptedBytes);
}

// 加密、压缩
const crypto = require('crypto');
function encrypt(key, iv, data) {
  let decipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  // decipher.setAutoPadding(true);
  return decipher.update(data, 'binary', 'base64') + decipher.final('base64');
}

function decrypt(key, iv, crypted) {
  crypted = Buffer.from(crypted, 'base64').toString('binary');
  let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  return decipher.update(crypted, 'binary', 'utf8') + decipher.final('utf8');
}
let key = '123456789abcdefg';
console.log('加密的key:', key);
let iv = 'abcdefg123456789';
console.log('加密的iv:', iv);
let data = 'This is an example';
// let data = 'Thisisanexample.';
console.log('需要加密的数据:', data);
let crypted = encrypt(key, iv, data);
console.log('数据加密后:', crypted);
let dec = decrypt(key, iv, crypted);
console.log('数据解密后:', dec);

module.exports = {
  encryptByAes,
  decryptByAes,
  encrypt,
  decrypt,
  removeFile,
  removeDir,
  removeDirFile(files, dirs) {
    setTimeout(() => {
      Array.isArray(files) ? files.map((file) => removeFile(file)) : removeFile(files);
      setTimeout(() => {
        Array.isArray(dirs) ? dirs.map((dir) => removeDir(dir)) : removeDir(dirs);
      }, 2000);
    }, 10000);
  },
};
