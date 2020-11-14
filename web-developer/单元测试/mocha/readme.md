# mocha
[TOC]

## 介绍
Mocha是一个功能丰富的测试框架，在Node.js和浏览器中运行，承诺使异步代码测试起来“简单又有趣”。测试串行运行，支持者称这便于准确而灵活的报告，同时将未捕获的异常与准确的测试用例对应起来。

### 使用入门
测试脚本与所要测试的源码脚本同名，但是后缀名为.test.js（表示测试）或者.spec.js（表示规格）。
测试脚本里面应该包括一个或多个describe块，每个describe块应该包括一个或多个it块。


```js
var add = require('../src/add.js');
// 断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库。
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });

  it('任何数加0应该等于自身', function() {
    // 断言
    expect(add(1, 0)).to.be.equal(1);
    expect(add(2, 0)).to.be.equal(2);
    expect(add(12, 0)).to.be.equal(12);
  });
});
```

### describe
测试套件
一组相关的测试

### it
测试用例
一个单独的测试，测试的最小单元

### 断言库
断言 > 0

> 断言库有很多种，Mocha并不限制使用哪一种

上面代码引入的断言库是chai，并且指定使用它的expect断言风格。

所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的==关键==。

> 头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等。两者之间使用to/to.be连接。

> 如果expect断言不成立，就会抛出一个错误。事实上，==只要不抛出错误，测试用例就算通过==。



## 实际运用
运行算法部分的测试

### --recursive 
执行根目录下的test文件夹下的所有文件


### --watch
监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha

### mocha.opts
demo03
todo: 配置无用
ocha允许在test目录下面，放置==配置文件mocha.opts==，把命令行参数写在里面

### 通配符 *
`mocha 'web-developer/Datastruct&&Algorithm/string/*.test.js'`


### --reporter mochawesome
demo02
生成漂亮的HTML格式的报告 


### --bail, -b
遇到未通过就停止执行

### --grep, -g
参数：搜索==测试用例==的名称（即it块的第一个参数），然后只执行匹配的测试用例。

### --invert, -i
--invert参数表示只运行不符合条件的测试脚本，必须与--grep参数配合使用。
` mocha --grep "1 加 1" --invert`


### --growl
打开--growl参数，就会将测试结果在`桌面显示`。




## 进阶运用

### es6
demo04
运行项目目录下的mocha, 不能使用全局mocha

`../node_modules/mocha/bin/mocha --compilers js:babel-core/register`

参数后面紧跟一个用冒号分隔的字符串，冒号左边是文件的后缀名，右边是用来处理这一类文件的模块名。

#### 全局对象及方法的支持
note: Babel默认不会对Iterator、Generator、Promise、Map、Set等全局对象，以及一些全局对象的方法（比如Object.assign）转码。如果你想要对这些对象转码，就要安装==babel-polyfill==。

然后，在你的脚本头部加上一行。


`import 'babel-polyfill'`

### 异步测试
demo05
#### --timeout, -t
对于涉及异步操作的测试用例，这个时间往往是不够的，需要用-t或--timeout参数指定==超时门槛==。

#### --slow, -s
Mocha默认会高亮显示==超过75毫秒的测试用例==，可以用-s或--slow调整这个参数。

Mocha内置对Promise的支持，允许直接返回Promise，等到它的状态改变，再执行断言，而不用显式调用done方法。请看

```js
// promise
it('异步请求应该返回一个对象', function() {
  return fetch('https://api.github.com')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).to.be.an('object');
    });
});

// async / setTimeout 显示调用done()
var expect = require('chai').expect;
describe('timeout.test.js - 超时测试', function() {
  it('测试应该 5000 毫秒后结束', function(done) {
    var x = true;
    var f = function() {
      x = false;
      expect(x).to.be.not.ok;
      done();
    };
    setTimeout(f, 4000);
  });
});
```

#### 钩子
demo06

Mocha在describe块之中，提供测试用例的四个钩子：before()、after()、beforeEach()和afterEach()。它们会在指定时间执行。

```js
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```

### 测试用例管理
demo07
#### only 
多个测试用例，仅仅执行一个时
> describe块和it块 都支持

#### skip
表示跳过指定的测试套件或测试用例。


### 浏览器测试
`mocha init demo08`
在某个文件中写测试用例

### 生成规格文件
demo09

#### markdown
` mocha --recursive -R markdown > spec.md`

#### html
`mocha --recursive -R doc > spec.html`

## 参考
- [测试框架 Mocha 实例教程 - 阮一峰](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
  - [github - 阮一峰](https://github.com/ruanyf/mocha-demos)

