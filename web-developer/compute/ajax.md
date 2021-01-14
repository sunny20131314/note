# ajax

[TOC]

## ajax是什么
> AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。


> 是指一种创建交互式、快速动态网页应用的网页开发技术，无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新

### 局部更新
这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

### 浏览器技术
Ajax 是一种独立于 Web 服务器软件的浏览器技术。

### 优点
- 局部更新，更为迅捷地回应用户动作
- Ajax不需要任何浏览器插件，只需要用户允许JavaScript在浏览器上执行

### 缺点
- 可能破坏浏览器的后退与加入收藏书签功能
  - 在动态更新页面的情况下，用户无法回到前一个页面状态，这是因为浏览器仅能记下历史记录中的静态页面。一个被完整读入的页面与一个已经被动态修改过的页面之间的可能差别非常微妙；用户通常都希望单击后退按钮，就能够取消他们的前一次操作，但是在Ajax应用程序中，却无法这样做。
    - 不过开发者已想出了种种办法来解决这个问题，HTML5之前的方法大多是在用户单击后退按钮访问历史记录时，通过创建或使用一个隐藏的`IFRAME`来重现页面上的变更。
    - HTML5之前的一种方式是使用`URL片断标识符`（通常被称为锚点，即URL中#后面的部分）来保持追踪，允许用户回到指定的某个应用程序状态。（许多浏览器允许JavaScript动态更新锚点，这使得Ajax应用程序能够在更新显示内容的同时更新锚点。）HTML5以后可以直接操作浏览历史，并以字符串形式存储网页状态，将网页加入网页收藏夹或书签时状态会被隐形地保留。上述两个方法也可以同时解决无法后退的问题。
- 网络延迟
  - 使用一个`可视化的组件 loading`来告诉用户系统正在进行后台操作并且正在读取数据和内容。

## <a name="XMLHttpRequest"> 创建XMLHttpRequest对象</a>

```js
function GetXmlHttpObject() {
  let xmlHttp = null;

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // 或者这种方式
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer IE5 和 IE6 使用 ActiveXObject
    try {
      xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
  }
  return xmlHttp;
}

const xmlHttp = GetXmlHttpObject();
// 设置头部
xmlHttp.setRequestHeader('Content-Type','application/json');
xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    const data = xmlHttp.responseText;
    document.getElementById('myDiv').innerHTML = data;
  }
};
xmlHttp.open('GET', 'test.json?data=test', true);
xmlHttp.send();

// callback 函数是一种以参数形式传递给另一个函数的函数。
// 如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个标准的函数，并为每个 AJAX 任务调用该函数。

// 该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（每次调用可能不尽相同）：
function myFunction() {
  loadXMLDoc('ajax_info.txt', function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      document.getElementById('myDiv').innerHTML = xmlhttp.responseText;
    }
  });
}

```
## <a name="onreadystatechange"> onreadystatechange 事件</a>
 当请求被发送到服务器时，我们需要执行一些基于响应的任务。
每当 readyState 改变时，就会触发 onreadystatechange 事件。
readyState 属性存有 XMLHttpRequest 的状态信息。
onreadystatechange: 存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。

readyState: 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。

	0: 请求未初始化
	1: 服务器连接已建立
	2: 请求已接收
	3: 请求处理中
	4: 请求已完成，且响应已就绪

status:
	
	200: "OK"
	404: 未找到页面


## <a name="AsyncTrue">  Async = true</a>

``` js
// 当使用 async=true 时，请规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数：
xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    var data = xmlHttp.responseText;
    document.getElementById('myDiv').innerHTML = data;
  }
};
xmlHttp.open('GET', 'test.json?data=test', true);
xmlHttp.send();
```

## <a name="AsyncFalse">  Async = false</a>


``` js
xmlhttp.open('GET', 'test.json', false);
xmlhttp.send();
// 当使用 async=false 时，请不要编写 onreadystatechange 函数 --> 把代码放到 send() 语句后面即可：
document.getElementById('myDiv').innerHTML = xmlhttp.responseText;
```

## <a name="readData">  读取数据</a>

读取数据用XMLHttpRequest 对象的 responseText 或 responseXML 属性。

1. 如果来自服务器的响应并非 XML，请使用 `responseText` 属性。
responseText 属性返回字符串形式的响应.
2. responseXML 属性
如果来自服务器的响应是 XML，而且需要作为 XML 对象进行解析，请使用 responseXML 属性：
  ``` js
    xmlDoc = xmlhttp.responseXML;
    let txt = '';
    x = xmlDoc.getElementsByTagName('article');
    for (i = 0; i < x.length; i++) {
      // 解析 responseXML 属性
      txt = `${txt + x[i].childNodes[0].nodeValue}<b />`;
    }
    document.getElemenstByClassName('myDiv').innerHTML = txt;
  ```
3. getResponseHeader: 得到具体的请求信息
4. xmlhttp.getAllResponseHeaders() 得到所有的请求信息

  ```js
  xmlhttp.getResponseHeader('Last-Modified');
  ```
## <a name="getOrPost">  GET 还是 POST？</a>(ps: 另见 http协议)

区别：
1. 与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。如果您希望通过 GET 方法发送信息，请向 URL 添加信息：
  ```js
    xmlhttp.open('GET', 'demo_get2.asp?fname=Bill&lname=Gates', true);
  ```
2. 然而，在以下情况中，请使用 POST 请求：
	* 无法使用缓存文件（更新服务器上的文件或数据库）
	* 向服务器发送大量数据（POST 没有数据量限制）
	* 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：
 
``` js
  xmlhttp.open('POST', 'ajax_test.asp', true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  // setRequestHeader(header, value); //向请求添加 HTTP 头。
  // header: 规定头的名称
  // value: 规定头的值

  xmlhttp.send('fname=Bill&lname=Gates');
```


## 参考
- [Ajax 开发](https://baike.baidu.com/item/ajax/8425?fr=aladdin)