## 跨域


1. iframe跨域访问( 分为不同/同主域 )

一、 是同主域下面，不同子域之间的跨域；

   1,设置相同的document.domian;
   
   优点： 实现最简单但只能用于同一个主域下不同子域之间的跨域请求。比如 junshi.demo.com 和 mobile.demo.com 之间，只要把两个页面的document.domain都指向主域就可以了，比如document.domain='demo.com';。
设置好后父页面和子页面就可以像同一个域下两个页面之间访问了。父页面通过ifr.contentWindow就可以访问子页面的window，子页面通过parent.window或parent访问父页面的window，接下来可以进一步获取dom和js。

```javascript
  //http://junshi.demo.com/a.html
   document.domain = 'demo.com';

  // 测试这个函数能不能被页面b调用
  function aa(str) {
    console.log(str);
  }


  var ifr = document.getElementById('a');
  ifr.style.display = 'none';

  window.onload = function(){


    // 父页访问子页，可以ifr.contentWindow.document来访问iframe页面的内容；如果支持contentDocument也可以直接可以ifr.contentDocument访问子页面内容；
    var doc = ifr.contentDocument || ifr.contentWindow.document;

    // 在这里操纵b.html,通过content获取window对象(内容都存在 demo.com 这个主域下)
    console.log(doc);
    console.log( ifr.contentWindow.bb );

    // 父页面通过ifr.contentWindow 就可以访问子页面的window
    ifr.contentWindow.bb( 'aaa' );
  };
```

　　子页访问父页，可以parent.js全局属性

``` javascript

 // http://mobile.demo.com/b.html
 document.domain = 'demo.com';

  // 测试这个函数能不能被页面a调用
  function bb(str) {
    console.log(str);
  }
  
  parent.aa('bbb');
```







## 参考
1. http://www.cnblogs.com/pigtail/archive/2013/01/24/2875310.html
2. https://segmentfault.com/a/1190000000702539
3. http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html