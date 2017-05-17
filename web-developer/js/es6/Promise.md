# Promise

[TOC]

## 含义
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

两个特点：
1、 对象的状态不受外界影响。 penging -> resolve / reject
2、一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

缺点：
首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 stream 模式是比部署Promise更好的选择。


## 基本用法

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。
resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。


Promise实例的状态变为Resolved，就会触发then方法绑定的回调函数。

```js
promise.then(function(value) {
  // success 即 resolve
}, function(error) {
  // failure 即 reject 可选的
});
```


Promise新建后就会立即执行：

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
  console.log(111);
});

promise.then(function() {
  console.log('Resolved.');
});

console.log('Hi!');

// Promise
// 111
// Hi!
// Resolved
```
Promise 会在当前tick的最后添加
上面代码中，Promise新建后立即执行，所以首先输出的是“Promise”。
然后，then方法指定的回调函数，将在当前脚本所有 ```同步任务执行``` (log 111, Hi！ ) 完才会执行，所以“Resolved”最后输出。


### 一个异步操作的结果是返回另一个异步操作
下面代码中，p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即p2一个异步操作的结果是返回p1另一个异步操作。
注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。
如果p1的状态是Pending，那么p2的回调函数就会等待p1的状态改变；
如果p1的状态已经是Resolved或者Rejected，那么p2的回调函数将会立刻执行。

```js
var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

var p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail

```

上面代码中，p1是一个Promise，3秒之后变为rejected。p2的状态在1秒之后改变，resolve方法返回的是p1。
由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。
所以，后面的then语句都变成针对后者（p1）。又过了2秒，p1变为rejected，导致触发catch方法指定的回调函数。


### then
Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。
它的作用是为Promise实例添加状态改变时的回调函数。
前面说过，then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。
then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
因此可以采用链式写法，即then方法后面再调用另一个then方法。

### catch
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
抛出错误的两种写法：
throw new Error('test');
reject(new Error('test'));

注意：
1、 Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。
2、跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，
Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。












## 参考：
1. [Promise 对象](http://es6.ruanyifeng.com/#docs/promise)