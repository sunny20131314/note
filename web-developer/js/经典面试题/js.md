# js

[TOC]

## scope
```js
var z = 10;
function foo() {
  console.log(z);
}
foo(); // 10
(function(fn) {
  var z = 20;
  fn(); // 10
})(foo);
```


## for
最简单for循环，直接执行。

```js
for (var i = 0; i < 5; i++) {
  console.log(i);
}
// 0,1,2,3,4

var data = [];
for (var i = 0; i < 5; i++) {
  console.log(i);
  data[i] = function () {
    console.log(i);
  };
}
data[0]();  // 5
data[1]();  // 5
data[2]();  // 5
```


## 参考：
1. [Excuse me？这个前端面试在搞事！](https://zhuanlan.zhihu.com/p/25407758)