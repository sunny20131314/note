# 兼容

## react兼容到ie8,需要引入相应的es5语法！分别有html和js方法

```html
<!--这种条件注释的方式下在ie10以上是无效的，如果是在ie10及以上的ie8及以下兼容模式，无效。。。-->
<!--[if lte IE 9]>
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js"></script>-->
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-sham.min.js"></script>-->

<!--<script src="../build/es5-shim.min.js"></script>-->
<!--<script src="../build/es5-sham.min.js"></script>-->
<![endif]-->
```


``` js
<script>
  // 
  if (!document.addEventListener) {// IE6~IE8
    alert(111);
    document.write('<script src="../build/es5-shim.min.js"><\/script>');
    document.write('<script src="../build/es5-sham.min.js"><\/script>');
  }
</script>
```


## 参考
1. http://www.zhangxinxu.com/wordpress/2013/12/iebetter-js-make-ie6-ie8-like-modern-browser-ie9-chrome/