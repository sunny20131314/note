# 模块化
[TOC]

> CommonJs模块化机制

## 特点
- 模块只会在执行的过程中被初始化一次。
- 每个模块都有一个module对象，并且会return module.exports
  - import 的内容即为 module.exports
    - 模块之间公共的方法或属性, 提供给其他模块使用
  - exports = module.exports
    - exports.** = ... 等同于 module.exports.** = ...
    - module.exports = ...
      - 导出一个单一成员
      - 注意： 当修改 exports = ... 时，module.exports不会修改(note: 指针) todo:

## 查找第三方包 require('第三方包名')
  - 先找到加载该包的模块的同级目录下的 node_modules
    - package.json  main
    - index.js
  - 上一级父级目录下查找 node_modules
  - 该模块的磁盘根路径也没找到：can not find module xxx

## 循环引用
见文件 a.js b.js 
a 依赖 b的counter， b又引用a，打印出结果

没什么诡异的，
  - 模块开放的内容只有module.export
  - 加载并执行模块a时，a依赖了b，于是加载执行b模块，b又依赖a（由于全局维护了模块的缓存， 发现a已存在，于是直接取出来返回，这时候获取到的模块a的信息，只有已加载的内容 :::::: 加载b之前滴module.exports 内容）

## es6 之 import export 
note: require拿到的是 module.exports 的所有内容
无default对象

es6: import AAA: AAA是 default 对应的变量
es6: import * as AAA: AAA 拿到的是 export 的所有变量集
