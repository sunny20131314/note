# ajax

1. [ajax是什么](#define)
2. [创建XMLHttpRequest对象](#XMLHttpRequest)
3. [onreadystatechange 事件](#onreadystatechange)
4. [Async = true](#AsyncTrue)
5. [Async = false](#AsyncFalse)
6. [读取数据](#readData)
7.  [GET 还是 POST](#getOrPost)

## <a name="define">ajax是什么</a>
> AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。

##<a name="XMLHttpRequest"> 创建XMLHttpRequest对象</a>

```
function GetXmlHttpObject() {
  var xmlHttp=null;
  
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 或者这种方式
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
   }
  catch (e) {
    // Internet Explorer IE5 和 IE6 使用 ActiveXObject
    try {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
  return xmlHttp;
}

var xmlHttp=GetXmlHttpObject();

xmlHttp.onreadystatechange=function() {
  if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var data = xmlHttp.responseText;
        document.getElementById("myDiv").innerHTML=data;
    }
}
xmlHttp.open("GET","test.json?data=test",true);
xmlHttp.send();

// callback 函数是一种以参数形式传递给另一个函数的函数。
如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个标准的函数，并为每个 AJAX 任务调用该函数。
该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（每次调用可能不尽相同）：
function myFunction()
{
loadXMLDoc("ajax_info.txt",function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
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


##<a name="AsyncTrue">  Async = true</a>
当使用 async=true 时，请规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数：

```
xmlHttp.onreadystatechange=function() {
  if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var data = xmlHttp.responseText;
        document.getElementById("myDiv").innerHTML=data;
    }
}
xmlHttp.open("GET","test.json?data=test",true);
xmlHttp.send();
```

## <a name="AsyncFalse">  Async = false</a>
当使用 async=false 时，请不要编写 onreadystatechange 函数 - 把代码放到 send() 语句后面即可：

```
xmlhttp.open("GET","test.json",false);
xmlhttp.send();
document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
```

## <a name="readData">  读取数据</a>

读取数据用XMLHttpRequest 对象的 responseText 或 responseXML 属性。

1. 如果来自服务器的响应并非 XML，请使用 responseText 属性。
responseText 属性返回字符串形式的响应.
2. responseXML 属性
如果来自服务器的响应是 XML，而且需要作为 XML 对象进行解析，请使用 responseXML 属性：

	```
	xmlDoc=xmlhttp.responseXML;
	txt=“”;
	x=xmlDoc.getElementsByTagName(“article”);
	for (i=0;i<x.length;i++)
	  {
	  txt=txt + x[i].childNodes[0].nodeValue + "<b />";
	  
	document.getElemenstByClassName("myDiv").innerHTML=txt;
	```
3. getResponseHeader: 得到具体的请求信息
xmlhttp.getAllResponseHeaders() 得到所有的请求信息

```
 xmlhttp.getResponseHeader('Last-Modified');
```
## <a name="getOrPost">  GET 还是 POST？</a>(ps: 另见 http协议)

区别：
1. 与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。如果您希望通过 GET 方法发送信息，请向 URL 添加信息：
```
xmlhttp.open("GET","demo_get2.asp? fname=Bill&lname=Gates",true)
```
2. 然而，在以下情况中，请使用 POST 请求：
	* 无法使用缓存文件（更新服务器上的文件或数据库）
	* 向服务器发送大量数据（POST 没有数据量限制）
	* 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：
 
``` javascript
xmlhttp.open("POST","ajax_test.asp",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Bill&lname=Gates");
setRequestHeader(header,value)	 | 向请求添加 HTTP 头。
header: 规定头的名称
value: 规定头的值
```
