const a = require('./a');
console.log("🚀 ~ file: b.js ~ line 1 ~  require('./a')", a);

var counter = (arr) => {
  return arr.length;
};

console.log("🚀 ~ file: b.js ~ line 8 ~  require('./a')", require('./a'));

module.exports = { counter };
exports = 12;
// note: module.exports 与 exports为 两个独立的变量，由于直接复制 exports 导致指针改动
console.log('🚀 ~ file: b.js ~ line 13 ~ exports', exports, module.exports);

setTimeout(() => {
  // note: 模块目录，模块内容 module.exports， require() 就是获取的 module.exports
  // note: 由于a模块中，module.exports 的内容更改，这时 require('a') 获取到的 module.exports为最后更改的内容
  console.log("🚀 ~ file: b.js ~ line 16 ~  require('./a')", a, require('./a'));
}, 2000);
