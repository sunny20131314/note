## webview
这里介绍的主要是安卓如何设置，打开网页，

在 Android 手机中内置了一款高性能 webkit 内核浏览器， SDK 中封装为一个叫做 WebView 组件。

WebView 类是 WebKit 模块 Java 层的视图类，（ 所有需要使用 Web 浏览功能的Android应用程序都要创建该视图对象显示和处理请求的网络资源。目前，WebKit 模块支持 HTTP、HTTPS、FTP 以及 javascript 请求。WebView 作为应用程序的 UI 接口，为用户提供了一系 列的网页浏览、用户交互接口，客户程序通过这些接口访问 WebKit 核心代码。 ）

什么是 webkit 
WebKit 是 Mac OS X v10.3 及以上版本所包含的软件框架（对 v10.2.7 及以上版本也可通过 软件更新获取） 同时，
WebKit 也是 Mac OS X 的 Safari 网页浏览器的基础。WebKit 是一个开源项目，主要由 KDE 的 KHTML 修改而来并且包含了一些来自苹果公司的一些组件。 
传统上， WebKit 包含一个网页引擎 WebCore 和一个脚本引擎 JavaScriptCore，它们分别对应 的是 KDE 的 KHTML 和 KJS。
不过，随着 JavaScript 引擎的独立性越来越强，现在 WebKit 和 WebCore 已经基本上混用不分（例如 Google Chrome 和 Maxthon 3 采用 V8引擎，却仍然 宣称自己是 WebKit 内核） 。

这里我们初步体验一下在 android 是使用 webview 浏览网页，
SDK 的 Dev Guide 中有一个 在 WebView 的简单例子 。 在开发过程中应该注意几点： 1.AndroidManifest.xml 中必须使用许可"android.permission.INTERNET",否则会出 Web page not available 错误。 


2.如果访问的页面中有 Javascript，则 webview 必须设置支持 Javascript。 webview.getSettings().setJavaScriptEnabled(true); 
3.如果页面中链接， 如果希望点击链接继续在当前 browser 中响应， 而不是新开 Android 的系统browser 中响应该链接，必须覆盖 webview 的 WebViewClient 对象.mWebView.setWebViewClient(new WebViewClient(){ public boolean shouldOverrideUrlLoading(WebView view, String url) { view.loadUrl(url); return true; } }); 

webview.addJavascriptInterface(new MyInterface(), "myobj");//第二步---注册在js中调用的对象名myobj
         
         webview.loadUrl("file:///android_asset/test.html");
         
 //第一步：定义要在js中调用的方法
    class MyInterface{
                   public String getname(){
                            return "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
            }
    }
复制代码
------------javascript中：-----

function myinterface(){
                 document.getElementById("myname").innerHTML = window.myobj.getname() ;
         }


4.如果不做任何处理，浏览网页，点击系统“Back”键，整个 Browser 会调用 finish()而结束自身，
  如果希望浏览的网 页回退而不是推出浏览器，需要在当前 Activity 中处理并消费 掉该 Back 事件。





webview学习记录总结： 

首先要在 manifest.main 文件中创建一个 webview， 
然后再 activity 中定义这个 webview 然后 进行以下相关操作。 
1、添加权限：AndroidManifest.xml 中必须使用许可"android.permission.INTERNET",否则会出 Web page not available 错误。 
2、在要Activity 中生成一个 WebView 组件：WebView webView = new WebView(this); 
3、设置WebView 基本信息： 
如果访问的页面中有 Javascript，则 webview 必须设置支持 Javascript。
webview.getSettings().setJavaScriptEnabled(true);
触摸焦点起作用 requestFocus(); 取消滚动条 this.setScrollBarStyle(SCROLLBARS_OUTSIDE_OVERLAY);
4 如果希望点击链接由自己处理，而不是新开 Android 的系统 browser 中响应该链接。
给 WebView添加一个事件监听对象（ WebViewClient)并重写其中的一些方法:
shouldOverrideUrlLoading：对网页中超链接按钮的响应。当按下某个连接时 WebViewClient会调用这个方法，
并传递参数：按下的 url onLoadResource onPageStart onPageFinish onReceiveError onReceivedHttpAuthRequest

5、如果访问的页面中有 Javascript，则 webview 必须设置支持 Javascript ，否则显示空白页面。
Java 代码 webview.getSettings().setJavaScriptEnabled(true); 

6、如果页面中链接，如果希望点击链接继续在当前 browser 中响应，而不是新开 Android 的系统 browser 中响应该链接，必须覆盖 webview 的 WebViewClient 对象： Java 代码 1.mWebView.setWebViewClient(new WebViewClient(){ 2. 3. 4. 5. 6. }); 
上述方法告诉系统由我这个 WebViewClient 处理这个 Intent,我来加载 URL。 点击一个链接的 Intent 是向上冒泡的，
shouldOverrideUrlLoading 方法 return true 表示我加载后这个 Intent 就消费了， 不再向上冒泡了。 

7、 如果不做任何处理， 在显示你的 Brower UI 时， 点击系统“Back”键， 整个 Browser 会作为一个整体“Back" }
public boolean shouldOverrideUrlLoading(WebView view, String url) { view.loadUrl(url); return true;
到其他 Activity 中，而不是希望的在 Browser 的历史页面中 Back。

 


## 参考
1. http://www.cnblogs.com/nuliniaoboke/archive/2012/12/03/2799772.html
