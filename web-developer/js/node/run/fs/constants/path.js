const path = require('path');

// 创建的文件夹
const dirPath = path.join(__dirname, '../../file/testDir');
// 读取的文件
const articlePath = path.join(dirPath, '../../file/article.txt');
// 写入的文件
const articleCopyPath = path.join(dirPath, 'articleCopy.txt');

module.exports = {
  dirPath,
  articlePath,
  articleCopyPath,
};
