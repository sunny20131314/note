module.exports.cc = 1;

const b = require('./b');

console.log(
  "🚀 ~ file: a.js ~ line 6 ~ counter(['js', 'nodejs', 'react'])",
  b.counter(['js', 'nodejs', 'react'])
);

module.exports.testFn = (v) => {
  console.log('🚀 ~ file: a.js ~ line 14 ~ v', v);
  return v;
};

console.log("🚀 ~ file: a.js ~ line 11 ~ require('./b')", require('./b'));

module.exports = 5;
