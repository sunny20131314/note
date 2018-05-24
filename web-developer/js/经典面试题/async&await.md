# async & await

[TOC]

## async

async函数返回的是一个promise对象，
   如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。
   如果在函数中没有返回值，结果返回Promise.resolve(undefined) 。


从字面意思上看await就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个promise对象也可以是其他值。
  很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上await是一个让出线程的标志。
  await后面的函数会先执行一遍，然后就会跳出整个async函数来执行后面js栈（后面会详述）的代码。
  等本轮事件循环执行完了之后又会跳回到async函数中等待await。
  后面表达式的返回值，如果返回值为非promise则继续执行async函数后面的代码，否则将返回的promise放入promise队列（Promise的Job Queue）

```
function testSometing() {
 console.log("执行testSometing");
 return "testSometing";
}

async function testAsync() {
 console.log("执行testAsync");
 return Promise.resolve("hello async");
}

async function test() {
 console.log("test start...");
 const v1 = await testSometing();//关键点1
 console.log(v1);
 const v2 = await testAsync();
 console.log(v2);
 console.log(v1, v2);
}

test();

var promise = new Promise((resolve)=> {
  console.log("promise start..");
  resolve("promise");
}); //关键点2

promise.then((val)=> console.log(val));

console.log("test end...")
```

执行结果：
test start...
执行testSometing
promise start..
test end...
testSometing
执行testAsync
promise
hello async
testSometing hello async

解说：
当test函数执行到

```
const v1 = await testSometing()；
```

的时候，会先执行testSometing这个函数打印出“执行testSometing”的字符串，然后因为await会让出线程就会区执行后面的

```
var promise = new Promise((resolve)=> {
  console.log("promise start..");
  resolve("promise");
}); //关键点2
```

然后打印出“promise start..”
  接下来会把返回的这promise放入promise队列（Promise的Job Queue），继续执行打印“test end...”，
  等本轮事件循环执行结束后，又会跳回到async函数中（test函数），等待之前await 后面表达式的返回值，
  因为testSometing 不是async函数，所以返回的是一个字符串“testSometing”，test函数继续执行，执行到

```
const v2 = await testAsync();
```

和之前一样又会跳出test函数，执行后续代码，此时事件循环就到了promise的队列，
  执行promise.then((val)=> console.log(val));then后面的语句，之后和前面一样又跳回到test函数继续执行。


2. 我们再看一个例子把testSometing函数前面加上async

```
async function testSometing() {
 console.log("执行testSometing");
 return "testSometing";
}

async function testAsync() {
 console.log("执行testAsync");
 return Promise.resolve("hello async");
}

async function test() {
 console.log("test start...");
 const v1 = await testSometing();
 console.log(v1);
 const v2 = await testAsync();
 console.log(v2);
 console.log(v1, v2);
}

test();

var promise = new Promise( (resolve) => {
  console.log("promise start..");
  resolve("promise");
}); //关键点2
promise.then((val)=> console.log(val));

console.log("test end...")
```
执行结果：
test start...
执行testSometing
promise start..
test end...
promise
testSometing
执行testAsync
hello async
testSometing hello async

解说：
和上一个例子比较发现promise.then((val)=> console.log(val));先与console.log(v1);执行了，
  原因是因为现在testSometing函数加了async，返回的是一个Promise对象要要等它resolve，所以将当前Promise推入队列，所以会继续跳出test函数执行后续代码。
  之后就开始执行promise的任务队列了，所以先执行了promise.then((val)=> console.log(val));因为这个Promise对象先推入队列；


## 参考：
1. [Js中async/await的执行顺序详解](http://www.jb51.net/article/124321.htm)