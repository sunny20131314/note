# 闭包&promise

[TOC]

## for
最简单for循环，直接执行。

```js
for (var i = 0; i < 5; i++) {
  console.log(i);
}
// 0,1,2,3,4
```

## setTimeout
setTimeout(function[|string], number, ...args)
第一个参数 可以接收字符串 or function
第二个参数 可以接收数字 ms
第三个参数及以后 是直接传给第一个参数(为function时)调用  -> TODO: setTimeout的第三个参数主要得到了除IE外的系列浏览器的支持


情景1：

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000 * i);
}
// 5,5,5,5,5
// 由于没有保存变量i的引用，所以执行匿名函数时， 会直接向上查找变量i, 而这时变量i->5


for (var i = 0; i < 5; i++) {
  setTimeout(function(i) { // 变量i -> undefined
    console.log(i);
  }, 1000 * i);
}
// undefined 5times


for (var i = 0; i < 5; i++) {
  setTimeout(function(i) {
    console.log(i);
  }, 1000 * i, i);
}
// 0,1,2,3,4

```


情景2：

```js
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
// 0,1,2,3,4

```
使用闭包，保存了对变量i的引用



情景3、

```js
for (var i = 0; i < 5; i++) {
  (function() {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}
// 5,5,5,5,5

```
与情景2相比，虽然也使用闭包，但是没有保存对变量i的引用


情景4：

```js
for (var i = 0; i < 5; i++) {
  setTimeout((function(i) {
    console.log(i);
  })(i), i * 1000);
}
// 0,1,2,3,4
```

这个情景需要注意，传给setTimeout的是匿名函数的执行结果即 undefined, 也就是setTimeout(undefined, ...);
而立即执行函数会立即执行，所以输出 0,1,2,3,4



##  Promise
promise 会在当前tick的最后添加, 而setTimeout会添加在任务队列后面，下一个tick

```js
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  if (1) {
    for( var i=0 ; i<10000 ; i++ ) {
      i == 9999 && console.log(i);
    }
    console.log(3);
    resolve();
    // 2 9999 3 5 4 1

  }
  else {
    for( var i=0 ; i<10000 ; i++ ) {
      i == 9999 && resolve();
    }
    console.log(3);
  // 2 3 5 4 1
}

}).then(function() {
  console.log(4);
});
console.log(5);

// 疑问点在于，为什么是会执行3?  for循环为什么会在console.log(3); 之后执行, js如何判断为异步？？？？
```

首先先碰到一个 setTimeout，于是会先设置一个定时，在定时结束后将传递这个函数放到任务队列里面，因此开始肯定不会输出 1 。
然后是一个 Promise，里面的函数是直接执行的，因此应该直接输出 2 3 。
然后，Promise 的 then 应当会放到当前 tick 的最后，但是还是在当前 tick 中。
因此，应当先输出 5，然后再输出 4 。
最后在到下一个 tick，就是 1 。











## 参考：
1. [Excuse me？这个前端面试在搞事！](https://zhuanlan.zhihu.com/p/25407758)