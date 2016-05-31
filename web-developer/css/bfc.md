## BFC
1. <a href="#BFCDefine"> BFC 定义 </a>
2. <a href="#formBfc">形成BFC </a>


### 1.<a name="BFCDefine">BFC 定义</a>
> BFC(Block Formatting Context 块格式上下文)，简单讲，它是提供了一个独立布局的环境，每个BFC都遵守同一套`布局规则`。

例如，在同一个BFC内，盒子会一个挨着一个的排，相邻盒子的间距是由margin决定且垂直方向的margin会重叠。
而float和clear float也只对同一个BFC内的元素有效。


### 2.<a name="formBfc">形成BFC</a> 
浮动元素和绝对定位元素，
非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），
以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建`新的BFC`（块级格式上下文）。

即以下四种情况会形成BFC

``` css
float：left|right  ---- 不为none
position：absolute|fixed
display: table-cell|table-caption|inline-block|flex |inline-flex
overflow: hidden|scroll|auto    ------overflow的值不为visible
```

这一开始听起来可能有些困惑，因为我们在前面讨论了BFC导致外边距折叠的问题。
但我们必须牢记在心的是毗邻块盒子的垂直外边距折叠只有他们是在同一BFC时才会发生。
如果他们属于不同的BFC，他们之间的外边距将不会折叠。所以通过创建一个新的BFC我们可以防止外边距折叠。


### 文档流：
将窗体自上而下分成一行一行,并在每行中按从左至右的挨次排放元素,即为文档流。`浮动(float)、绝对定位(absolute)、固定定位(fixed)`三种方式定位会脱离文档流`normal flow`






### 常见问题
1. 为何需要清除浮动及如何清除浮动？



### 问题解决
1. 浮动
    -  原因：一个块级元素的高度如果没有设置height，那么其高度就是由里面的`子元素`来撑开的，如果子元素使用浮动，脱离了标准的文档流，那么父元素的高度会将其忽略，你可以使用firebug查看下如果不清除浮动，父元素会出现高度不够，那样如果设置border或者background都得不到正确的解析.
    -  解决： 清除浮动包括清除子元素的浮动和清除上级元素的浮动
        *  1.清除上级元素的浮动，只需设置clear为both就可以了，
        *  2.清除子元素的浮动则可以用空标签法、clearfix方法或overflow方法。
               - 空标签法清除子元素浮动会增加额外标签。
               - 浮动元素的父元素上加上一个clearfix class，然后这个父元素的框就会包括所有的浮动子元素。
               - overflow 形成了bfc。
           
           ```css
          .clearfix:after,
          .clearfix:before {  //伪元素默认是行内元素
			  display: block;
			  height: 0;
			  clear: both;
			  content: "";
			  visibility: hidden;
			  font-size: 0;
			}
		.clearfix { *zoom: 1;}  //ie 6,7
           ```

    
2. 









## 参考
1. http://www.w3cplus.com/css/understanding-block-formatting-contexts-in-css.html
