# node

## what

> Node.js 不是一门语言也不是框架，它只是基于 Google V8 引擎的 JavaScript ==运行环境==，同时结合 `Libuv` 扩展了 JavaScript 功能，使之支持 io、fs 等只有语言才有的特性，使得 JavaScript 能够同时具有 DOM 操作(浏览器)和 I/O、文件读写、操作数据库(服务器端)等能力，是目前最简单的全栈式语言

- Joyent 的员工 Ryan Dahl 开发, 全栈式语言
- 有chrome V8引擎的JavaScript运行环境
  - 操作数据库，进行文件读写

- 高密集的I/O模型，比如 Web 开发，微服务，前端构建
- 包管理工具，npm已经成为世界开源包管理中最大的生态，功能强大，目前单月使用者接近1000万

## 特点
- 事件驱动
- 非阻塞IO模型（异步）
- 轻量和高效 



## run
学习node的笔记


file:///Users/sunny/Documents/workspace/project/-front_end_notebook/Node/day1/%E6%96%87%E6%A1%A3/08.npm%E5%B8%B8%E8%A7%81%E5%91%BD%E4%BB%A4.html


## 爬虫
cheerio
> cheerio是nodejs的抓取页面模块，为服务器特别定制的，快速、灵活、实施的jQuery核心实现。适合各种Web爬虫程序。

[cherrio 文档](file:///Users/sunny/Documents/workspace/project/-front_end_notebook/Node/day3/%E6%96%87%E6%A1%A3/01-cherrio.html)
[cherrio run](/Users/sunny/Documents/workspace/project/note/web-developer/js/node/run/http/cheerio)



## 工具类

### nodemon
自动检测到目录中的文件更改时, 通过重新启动应用程序来调试基于node.js的应用程序

项目运行之后，nodemon会自动监听代码的改动，并且重新启动服务，大大增加我们开发效率。

#### 常见配置
##### nodemon ./server.js localhost 8080
在命令行指定应用的端口号

##### nodemon -h 或者 nodemon --help
查看帮助，帮助里面有很多选项都是一目了然：


##### nodemon --debug ./server.js 80
运行 debug 模式：
手动重启项目： Nodemon 命令运行的终端 窗口中输入 rs 两个字符，然后再按下回车键，就能手动重启 Nodemon了。