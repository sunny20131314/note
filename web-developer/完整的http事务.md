## 一次完整的HTTP事务

基本流程：

a. 域名解析( DNS 解析域名为ip, 域名ip映射表 )
  - 客户端发送请求访问 www.haha.cn 到DNS域名解析器.
  - DNS 解析: 先找到root DNS,查询域名的授权服务器. > 查询域名的ip地址 > 向智能调度DNS查询 >
  根据`网络流量`和`各节点的连接`、`负载状况`以及到用户的` 距离`等,将最适合的CDN节点ip地址回应给 LocalDns.
    > cdn溯源: 发送请求时,文件不存在则往总服务器上找!!!

b. 发起TCP的3次握手

c. 建立TCP连接后发起http请求

d. 服务器端响应http请求，浏览器得到html代码

e. 浏览器解析html代码，并请求html代码中的资源

f. 浏览器对页面进行渲染呈现给用户.
  - [页面的渲染](http://web.jobbole.com/84843/):
  dom,cssom: Bytes > characters(字,符号) > tokens(startTag:html, startTag:head) > nodes > object Model
     - create/update 边下载边自上而下解析html文件构建为dom树,并并行发送请求  > css,js,图片
     - create/update render cssom (css加载完成,开始构建cssom)
     - create/update render tree (渲染树构建) 网页中的节点,各个节点的css定义及从属关系
       - display:none, 不会解析到render tree 中
     - layout(布局): 计算每个节点在屏幕中的位置
     - painting: 渲染树绘制


