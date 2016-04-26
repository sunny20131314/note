HTTP协议详解：
 1. [定义](#define)
 2. [url](#url)
 3. [无状态的协议](#noStatus)
 4. [消息结构](#msgStru)
 5. [Response状态行](#status)
 6. 

## 定义 <a name="define"></a>   

> 超文本传输协议（英文：HyperText Transfer Protocol，缩写：HTTP）

> 设计之初是为了将超文本标记语言(HTML)文档从Web服务器传送到客户端的浏览器。现在http的作用已不局限于HTML的传输。

> 版本：http/1.0 http/1.1* http/2.0

在Web应用中，服务器把网页传给浏览器，实际上就是把网页的HTML代码发送给浏览器，让浏览器显示出来。而浏览器和服务器之间的传输协议是HTTP，所以：
 
  - HTML是一种用来定义网页的文本，会HTML，就可以编写网页；
  - HTTP是在网络上传输HTML的协议，用于浏览器和服务器的通信。

  
## url  <a name="url"></a>   
 http://www.mywebsite.com/sj/test;id=8079?name=sviergn&x=true#stuff

	Schema: http                                     | 指定低层使用的协议(例如：http, https, ftp)
	host: www.mywebsite.com                  | HTTP服务器的IP地址或者域名
	port#：HTTP服务器的默认端口是80，这种情况下端口号可以省略。如果使用了别的端口，必须指明，例如 http://www.mywebsite.com:8080/
	path: /sj/test                                     | 访问资源的路径
	URL params: id=8079
	Query String: name=sviergn&x=true   | 发送给http服务器的数据
	Anchor: stuff                                     | 锚


## 无状态的协议  <a name="noStatus"></a>   

> 同一个客户端的这次请求和上次请求是没有对应关系，对http服务器来说，它并不知道这两个请求来自同一个客户端。

解决方法：Cookie机制来维护状态  ??? 

既然Http协议是无状态的，那么Connection:keep-alive 又是怎样一回事？

> 无状态是指协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态。从另一方面讲，打开一个服务器上的网页和你之前打开这个服务器上的网页之间没有任何联系。
> 缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

##  消息结构  <a name="msgStru"></a>   
1. `Request` 消息的结构：三部分
	第一部分叫Request line（`请求行`）， 第二部分叫http header(http头部信息), 第三部分是body

	请求行：包括http请求的种类，请求资源的路径，http协议版本   `GET /global/prompt?_=1460428725482 HTTP/1.1`

	body：`发送给服务器的query信息` :  当使用的是"GET" 方法的时候，body是为空的（`GET只能读取服务器上的信息，post能写入`）
2. `Response`消息的结构
	也分为三部分，第一部分叫Response line, 第二部分叫Response header，第三部分是body
	Response line：协议版本、状态码、message
	Response header：Response 头信息
	body：`返回的请求资源主体 `



## Response状态行 <a name="status"></a>   

所有HTTP响应 Response 消息中的第一行叫做状态行，由HTTP协议版本号， 状态码(3位数字组成的)， 状态消息 (彼此由空格分隔)三部分组成。  eg: `HTTP/1.1 200 OK`

状态代码的第一个数字代表当前响应的类型：

1xx消息——请求已被服务器接收，继续处理                           
2xx成功——请求已成功被服务器接收、理解、并接受 200
3xx重定向——需要后续操作才能完成这一请求 
4xx请求错误——请求含有词法错误或者无法被执行 404
5xx服务器错误——服务器在处理某个正确请求时发生错误

	200 OK 
	请求被成功地完成，所请求的资源发送回客户端
	302 Found 
	重定向，新的URL会在response中的Location中返回，浏览器将会使用新的URL发出新的Request
	304 Not Modified 
	文档已经被缓存，直接从缓存调用
	400 Bad Request 
	客户端请求与语法错误，不能被服务器所理解 
	403 Forbidden 
	服务器收到请求，但是拒绝提供服务 
	404 Not Found 
	请求资源不存在
	500 Internal Server Error 
	服务器发生了不可预期的错误 
	503 Server Unavailable 
	服务器当前不能处理客户端的请求，一段时间后可能恢复正常



## <a name="getOrPost">  GET 还是 POST？</a>(ps: 另见 ajax)
http协议定义了很多与服务器交互的方法，最基本的有4种，分别是GET,POST,PUT,DELETE。 一个URL地址用于描述一个网络上的资源，而HTTP中的GET, POST, PUT, DELETE 就对应着对这个资源的查，改，增，删4个操作。 我们最常见的就是GET和POST了。GET一般用于获取/查询资源信息，而POST一般用于更新资源信息.

1. GET 提交的数据会放在`URL`之后，以?分割URL和传输数据，参数之间以&相连，如EditPosts.aspx?name=test1&id=123456。POST 方法是把提交的数据放在HTTP包的Body中。

2. GET 提交的数据大小有限制（因为浏览器对URL的长度有限制），而POST方法提交的数据`没有限制`.

3. GET 方式需要使用`Request.QueryString `来取得变量的值，而POST方式通过`Request.Form`来获取变量的值。

4. GET 方式提交数据，会带来`安全问题`，比如一个登录页面，通过GET方式提交数据时，用户名和密码将出现在URL上，如果页面可以被缓存或者其他人可以访问这台机器，就可以从历史记录获得该用户的账号和密码. 

5. GET还是POST，GET仅请求资源，POST会附带用户数据

6. 如果是POST，那么请求还包括一个Body，包含用户数据。


## 参考文章
1. https://www.zybuluo.com/yangfch3/note/167490
