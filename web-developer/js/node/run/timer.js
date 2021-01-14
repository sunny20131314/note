// 全局变量
// note: setInterval 循环调用
// note: setTimeout 定时调用一次
// note: setImmediate 尽快调用一次
// test timer
let time = 0;
// const timer = setInterval(() => {
//   time++;
//   console.log(`${time} second later`);
//   if (time > 10) {
//     clearInterval(timer);
//   }
// }, 1000);
const timer = setImmediate(() => {
  time++;
  console.log(`${time} second later`);
  if (time > 10) {
    clearImmediate(timer);
  }
}, 1000);

// function
function sayHi() {
  console.log(`asy hi`);
}
function sayBye() {
  console.log(`bye`);
}
function callFunction(func) {
  func();
}
callFunction(sayHi);