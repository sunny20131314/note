const events = require('events');
const util = require('util');
const fs = require('fs');
const module1 = require('module');

// console.log('🚀 ~ file: demo.js ~ line 3 ~ util', util);
// console.log('🚀 ~ file: demo.js ~ line 3 ~ global', global);
// console.log('🚀 ~ file: demo.js ~ line 3 ~ fs', fs);
// console.log('🚀 ~ file: demo.js ~ line 3 ~ module', module);
// console.log('🚀 ~ file: demo.js ~ line 3 ~ module1', module1);
// console.log('🚀 ~ file: demo.js ~ line 3 ~ events', events);

// b 继承 a
// note: es6: b = Object.create(a, {props}) 基于 a 的 prototype，以及第2个入参 创建一个新对象
// util.inherits(a, b);

// 事件监听器
const myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', (msg) => {
  console.log(msg);
});

myEmitter.emit('someEvent', 'emit someEvent');
