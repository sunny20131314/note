const fs = require('fs');
const path = require('path');

const { dirPath, articlePath, articleCopyPath } = require('./constants/path');

// 同步
// note: 同步执行完所有，返回utf-8格式的string信息
// fs.readFileSync(路径, 编码格式/配置对象)
// var readme11 = fs.readFileSync(articlePath, 'utf8');
// var readme1 = fs.readFileSync(articlePath, { encoding: 'utf8' });

// note: 异步执行，执行回调
// fs.readFile(路径, 编码格式, 回调)
// var readme2 = fs.readFile(articlePath, 'utf8', function (err, data) {});

// 读取目录
fs.readdir(__dirname, function (err, files) {
  if (err) {
    return console.error(err);
  }
  files.forEach(function (file) {
    console.log(file);
  });
});

// note: 创建目录，读取某文件，然后写入刚创建的目录中
fs.mkdir(dirPath, { recursive: true, mode: 0777 }, function () {
  fs.readFile(articlePath, 'utf8', (err, data) => {
    console.log('🚀 ~ file: dir.js ~ line 9 ~ fs.readFile ~ err, data', err, data);
    fs.writeFile(articleCopyPath, data, (err, data) => {
      console.log('🚀 ~ file: dir.js ~ line 10 ~ fs.writeFile ~ err, data', err, data);

      require('./utils').removeDirFile(articleCopyPath, dirPath);
    });
  });
});
