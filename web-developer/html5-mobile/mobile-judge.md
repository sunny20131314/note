## 判断设备

### navigator
javascript 的navigator属性，主要用处是在做浏览器兼容的问题的时候，现在有的网站已经不兼容IE6，用户假如用IE6浏览网页的话，会提示浏览器升级等信息。或者判断是手机用户还是电脑用户，手机用户调整至手机网站，电脑用户之间跳转至电脑网页等等。

## ie7 及以下提示
``` javascript
if(window.ActiveXObject)
    {
        var browser=navigator.appName 
        var b_version=navigator.appVersion 
        var version=b_version.split(";"); 
        var trim_Version=version[1].replace(/[ ]/g,""); 
      if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"  || trim_Version=="MSIE7.0" ) { 
        $(".ie7andie6").show();    // .ie7andie6 显示相应的浏览器下载，更新   
          } 
   }
```
``` html
   <div class="ie7andie6 mod-main" style="display:none;">
      <p>您使用的浏览器版本较低，建议您换用下面这些浏览器试试吧。</p>
      <ul class="clr mod-browsers">
        <li><A class= " chrome " href="http://www.google.cn/intl/zh-CN/chrome/" target=_blank>Chrome</A> </li>
        <li><A class= " ie " href="http://windows.microsoft.com/zh-cn/internet-explorer/ie-10-worldwide-languages" target=_blank>IE10</A> </li>
        <li><A class= " ff " href="http://firefox.com.cn/" target=_blank>Firefox</A> </li>
    </ul>
</div>

```

### 判断移动终端，pc, 浏览器
``` javascript
//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}



// 判断
//判断是否IE内核
if(browser.versions.trident){ alert("is IE"); }
//判断是否webKit内核
if(browser.versions.webKit){ alert("is webKit"); }
//判断是否移动端
if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert("移动端"); }


//js 判断安卓或者ios 之正则表达式方式
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent);  
   //苹果端
} else if (/(Android)/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent); 
    //安卓端
} else {
   //pc端
};
```



比较特别的地方
UC浏览器没有安卓报头，只返回：linux ，这里粗略的根据linux来判断是安卓（前提必须满足是移动终端，UC这点是满足的）
安卓QQ浏览器HD版检测的结果是：mac， Safari

## 参考：
1. http://www.haorooms.com/post/js_pc_iosandmobile
2. http://www.haorooms.com/post/js_navigator_bb
