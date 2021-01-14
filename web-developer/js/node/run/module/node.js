const events = require('events');
const util = require('util');
const fs = require('fs');
const module1 = require('module');
const http = require('http');

console.log('🚀 ~ file: demo.js ~ line 3 ~ util', util);
console.log('🚀 ~ file: demo.js ~ line 3 ~ global', global);
console.log('🚀 ~ file: demo.js ~ line 3 ~ fs', fs);
console.log('🚀 ~ file: demo.js ~ line 3 ~ module', module);
console.log('🚀 ~ file: demo.js ~ line 3 ~ module1', module1);
console.log('🚀 ~ file: demo.js ~ line 3 ~ events', events);
