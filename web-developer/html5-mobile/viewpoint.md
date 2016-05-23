## viewpoint

#### [HTML中meta标签viewpoint的作用]()

> 在移动浏览器中使用viewport元标签控制布局,尺寸及分辨率各异的屏幕上渲染移动站点时更具一致性。

具体规则及使用详见,[移动布局设置相关](https://github.com/sunny20131314/note/blob/master/web-developer/mobile/移动布局设置相关.md)


#### debug过程

1.在web上浏览的时候，响应式布局是好用的，放大缩小页面都可以实现页面变更，但是在手机上调试的时候死活不能用

2.因为css中@media是根据window的宽度来控制css的，所以我尝试输出了一下在window变更的时候window的width，
结果发现PC上使用时一切正常，而手机上输出的一直是980。

原因很简单，手机上的浏览器是全屏的，我手机实际宽度是320像素，而我手机分辨率是980宽度，所以手机上打出来的是980手机分辨率而不是320.

3.增加以后发现手机window的width变为320了，即预期效果

``` html
  <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="black" name="apple-mobile-web-app-status-bar-style">
  <meta content="telephone=no" name="format-detection">
  <meta content="email=no" name="format-detection">
  
  
  <!--？？？-->
  <meta content="yes" name="apple-touch-fullscreen">
  <meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes">

```




#### viewpoint说明

1. width 控制viewpoint的宽度，可以是固定值，也可以是device-width，即设备的宽度
2. height 高度
3. initial-scale 控制初始化缩放比例，1.0表示不可以缩放
4. maximum-scale 最大缩放比例
5. minimum-scale 最小缩放比例

可见如果不定义viewpoint的话，页面宽度以屏幕分辨率为基准，而设置以后可以根据设备宽度来调整页面，
达到适配终端大小的效果

## 参考：
1. http://yansu.org/2013/05/06/the-viewpoint-metatag.html
