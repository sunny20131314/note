# jsonp原理

1）首先在客户端注册一个callback, 然后把callback的名字传给服务器。

2）服务器先生成 json 数据。

3）然后以 javascript 语法的方式，生成一个function , function 名字就
是传递上来的参数 jsonp.

4）最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。

5）客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时数据作为参数，传入到了客户端预先定义好的 callback 函数里.（动态执行回调函数）


## 具体操作:

1. 在html中生成script标签，src设为url的值： www.baidu.com?callback=‘haha’
2. 前端定义好一个回调函数，比如这个回调函数名是‘haha’
3. 后端读取到请求并解析地址，解析为对应对象关系，如果符合要求，那么后台返回：query.callback + “( ”+ JSON.stringify(data)  + “)”-> 后台植入的代码为：haha(data);



```  
javaScript

    <script type="text/javascript">  
        var localHandler = function (data) {//这里的data是远程文件回传的数据  
            if (data.success) {  
                window.location.href = data.url;  
            } else {  
                alert(data.url);  
            }  
        }  
        // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）  
        var url = "http://demo.jsonp.com/JsonpServlet?callback=localHandler&m=baidu";  
        // 创建script标签，设置其属性  
        var script = document.createElement('script');  
        script.setAttribute('src', url);  
        // 把script标签加入head，此时调用开始  
        document.getElementsByTagName('head')[0].appendChild(script);  
    </script>

 // 这个是jquery处理好的
           jQuery.ajax({  
                asyc: false,  
                type: "GET",  
                url: "http://demo.jsonp.com/JsonpServlet? callback = haha",  
                data: '',
                dataType: "jsonp",  
                jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)  
                jsonpCallback: "localHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名  
                success: function (data) {  
                    if (data.success) {  
                        window.location.href = data.url;  
                    } else {  
                        alert(data.url);  
                    }  
                }  
            });  

```

## 综合方法

```
;(function(){
  var formatParams = function(data) {//格式化参数
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
  };
  var jsonp = function(options) {
    options = options || {};
    if (!options.url || !options.callback) {
      throw new Error("参数不合法");
    }

    //创建 script 标签并加入到页面中
    var callbackName = ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    var params = "";
    if(options.data){
      options.data[options.callback] = callbackName;
      params += formatParams(options.data);
    }else{
      params+=options.callback+"="+callbackName;
    }
    var oS = document.createElement('script');
    oHead.appendChild(oS);

    //创建jsonp回调函数
    window[callbackName] = function (json) {
      oHead.removeChild(oS);
      clearTimeout(oS.timer);
      window[callbackName] = null;
      options.success && options.success(json);
    };

    //发送请求
    oS.src = options.url + '?' + params;

    //超时处理
    if (options.time) {
      oS.timer = setTimeout(function () {
        window[callbackName] = null;
        oHead.removeChild(oS);
        options.fail && options.fail({ message: "超时" });
      }, options.time);
    }
  };
  window.jsonp = jsonp;
})();
//调用方法
jsonp({
  url:"http://localhost:8000/name",
  callback:"callback",   //跟后台协商的接收回调名
  data:{id:"1000120"},
  success:function(json){
    alert("jsonp_ok");
  },
  fail:function(){
    alert("fail");
  },
  time:10000
});

// ajax的核心是通过XmlHttpRequest获取非本页内容，
而jsonp的核心则是动态添加<script>标签来调用服务器提供的js脚本。
```

## jsbridge 
和jsonp很类似，js调用方法，是以请求的方式发送出去，native可以捕获到这个请求，然后对参数其解析，比如发现是photo，native就会调用相应代码，然后把执行结果返回。







参考文章：

1. http://justcoding.iteye.com/blog/1366102

2. http://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html

3. http://blog.csdn.net/cqdz_dj/article/details/13629607
4. https://segmentfault.com/a/1190000002799156

