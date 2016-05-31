## css
### 目录:
1. 优雅降级 graceful degradation  渐进增强 progressive enhancement
2. 盒模式
3. 实现垂直居中
4. flex
5. 动画制作




### 优雅降级 graceful degradation  渐进增强 progressive enhancement
优雅降级: 一开始就对高级浏览器构建了完整的功能,然后对低版本浏览器做兼容.
渐进增强: 先是对低版本浏览器构建页面,保证了最基础的功能,再是对高版本浏览器进行效果,交互等改进和追加功能以达到更好的用户体验.

#### 区别：

a. 优雅降级是从复杂的现状开始，并试图减少用户体验的供给

b. 渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要

c. 降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带


### 盒模式
> CSS 框模型 (Box Model) 规定了元素框处理元素内容、内边距、边框 和 外边距 的方式。
在网页中，一个元素占有空间的大小由几个部分构成，4个部分一起构成了css中元素的盒模型。
box-sizing: content-box|border-box|inherit;
有两种,一种是 content-box 设置的width只是内容的宽度.
另一种是 border-box 设置的宽度 = 内容宽度 + padding + border


| box-sizing值     |    描述   |
| :--------        | :--------|
| content-box      | 宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。 |
| border-box       | 为元素设定的宽度和高度决定了元素的边框盒。就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。 |
| inherit          | 规定应从父元素继承 box-sizing 属性的值。 |


### 实现垂直居中
1, position: 需要相对父元素垂直居中,父元素上设置position: relative.
子元素设置position:absolute, top: 50%;margin-top: -height/2;
当设置了position时，margin: 0 auto;（只有当是block时才有效，inline-block无效） 将失效。

2, flex布局: 父元素设置为flex容器.align-items: center,就会垂直居中.

3, 如果是行内元素,子元素上设置: vertical-align: center, -- 无效,待考证
目前知道的就只有图片的情况下,图片的 vertical-align 属性会影响到文字的排列,默认是baseline.


### flex
> Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
采用Flex布局的元素，称为Flex容器（flex container），简称`"容器"`。
它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称`"项目"`。
设为Flex布局以后，子元素的float、clear和 vertical-align 属性将失效, block 元素也不会在元素前后自动换行.

> 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。
`主轴`的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；
`交叉轴`的开始位置叫做cross start，结束位置叫做cross end。
  项目默认沿主轴排列。
  单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

#### 以下6个属性设置在容器上:
 1, flex-direction属性决定主轴的方向（即项目的排列方向）。
  - flex-direction: row | row-reverse | column | column-reverse;

 2, flex-wrap属性定义，如果一条轴线排不下，如何换行。`默认情况下，项目都排在一条线（又称"轴线"）上。`
  - flex-wrap: nowrap | wrap | wrap-reverse;

 3, flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap.
  - flex-flow: <flex-direction> || <flex-wrap>;

 4, justify-content属性定义了项目在主轴上的对齐方式。
  - justify-content: flex-start (默认)| flex-end | center | space-between | space-around;
  - space-between：两端对齐，项目之间的间隔都相等。
  - space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

 5, align-items定义项目在交叉轴上如何对齐。
  - align-items: flex-start | flex-end | center | baseline | stretch;
  - baseline: 项目的`第一行文字`的`基线`对齐。
  - stretch（默认值）：如果项目`未设置高度`或`设为auto`，将`占满`整个容器的高度。

 6, align-content属性定义了多根轴线的对齐方式`交叉轴`。**如果项目只有一根轴线，该属性不起作用**。
  - align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
  - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  - stretch（默认值）：轴线占满整个交叉轴。


#### 以下6个属性设置在项目上:
  1, order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0(可为负)。

  2, flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
   - 如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。
   如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
   - 如果设置的比例超过项目的剩余空间,也只会把空间充盈,不影响下一主轴的排列.
   - 如果设置的比例`不`超过项目的剩余空间,也只会相应的放大,但项目之间的距离将会挨着排列(对于这一主轴而言,容器内设置的justify-content将会失效 ),不影响下一主轴的排列.

  3, flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
   - 如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
   如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小. 负值对该属性无效。

  4, flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
  浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
   - 它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。 -- 和设置width区别

  5, flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
   - flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
   - 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
   - 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

  6, align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
  默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
   - align-self: auto | flex-start | flex-end | center | baseline | stretch;




### 动效制作
> transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行 旋转(rotate)、skew 扭曲、scale 缩放、 translate 移动 、matrix 矩阵变形五大特效
> 
> Transition 过渡：拥有修改执行变换的属性，时长，速率和延迟时间的能力，大家都很熟悉的贝塞尔曲线，也是归属于transition的设定之下的。
> 
> Animation 动画：若将Transform解释为动作，Transition解释为过渡，那么Animation则是连续的几个动作，即动画。Animation可以我们设定keyframes的值，让元素在一段时间内完成多个动作。
> 
> SVG，也是动效制作中不可忽略的一大热门方法，我们定义它为擅长于线条的动画，弊端是：IE8,Android4.2及以下支持不好。 
　　知识普及：SVG，可缩放矢量图形(Scalable Vector Graphics) ，是被存成了XML格式的图像，它有一些特别的地方：
　　1.可被多种工具读取和修改(比如记事本)
　　尺寸更小，可压缩性更强
　　矢量
　　纯粹的 XML




transform: 

1. tranform属性

	- rotate（°）
	
		1. -x： 是从点到右边。（比如是矩形沿着x轴旋转，矩形的y轴上的中线为旋转点---也就是矩形的上的x、y轴上的中点，x轴方向，顺时针旋转。）[实例x](http://www.w3school.com.cn/tiy/c.asp?f=css_transform_rotatex)
		2. -y： 是从点到上边。（类似，沿着y轴旋转，矩形的x轴上的中线---也就是矩形的上的x、y轴上的中点，y轴方向，为旋转点，顺时针旋转。）[实例y](http://www.w3school.com.cn/tiy/c.asp?f=css_transform_rotatey)
		3. -z： 是从点到前边。类似，沿着z轴旋转，矩形的x轴上的中线---也就是矩形的上的x、y轴上的中点，z轴方向，为旋转点，顺时针旋转。）[实例y](http://www.w3school.com.cn/tiy/c.asp?f=css_transform_rotatey)
	
	- translate（px,rem等单位）, scale（数字，放大缩小倍率）
	这个就是在xyz轴上的相关位移，以相关中线（详细参考上方）为参照物。
	- skew（d°）: 定义沿着 X 和 Y 轴的 2D 倾斜转换.注意默认情况下： 无论是哪个方向的skew倾斜转换，容器内的元素都是以左上点进行定位！！！[实例skewx,y](http://www.w3school.com.cn/tiy/t.asp?f=css3_transform_skew)
		* skewX:  两条x轴方向的边a,c长度不变，旋转的角度d°是a、c中点的连线(即y轴方向的一条线)与y轴相交的角度。逆时针方向。
		* skewY:  两条y轴方向的边b,d长度不变，旋转的角度d°是b、d中点的连线(即x轴方向的一条线)与x轴相交的角度。顺时针方向旋转。
	为了方便调试，自己在本地写了个简单实例如下，请在chrome/safari下查看。
	
	```html
	<!DOCTYPE html>
	<html>
	<meta charset="utf-8">
	<title>
	  transform skew:扭曲
	</title>
	<head>
	  <style>
	    body {
	      padding: 200px;
	      width: 500px;
	      height: 400px;
	    }
	    div
	    {
	      width:100px;
	      height:100px;
	      border:1px solid black;
	      background-color:yellow;
	    }
	    .red {
	      width: 30px;
	      height: 20px;
	      background-color: red;
	    }
	    #div1 {
	      background-color:blue;
	      -webkit-transform:skew(0deg,70deg); /* Safari and Chrome */
	    }
	    #div2
	    {
	      background-color:blueviolet;
	      -webkit-transform:skew(0deg,110deg); /* Safari and Chrome */
	    }
	
	    #div3 {
	      -webkit-transform:skew(70deg,0deg); /* Safari and Chrome */
	    }
	
	    #div4 {
	      background-color:yellowgreen;
	      -webkit-transform:skew(110deg,0deg); /* Safari and Chrome */
	    }
	  </style>
	</head>
	<body>
	
	<div id="div1">
	  YYYYYY +++++
	  <div class="red">red</div>
	</div>
	
	<div id="div2">
	  YYYYYY -----
	  <div class="red">red</div>
	</div>
	
	<div id="div3">
	  XXXXXX +++++
	  <div class="red">red</div>
	</div>
	
	<div id="div4">
	  XXXXXX -----
	  <div class="red">red</div>
	</div>
	
	</body>
	</html>
	
	```
	- matrix： 定义 2D 转换，使用六个值的矩阵。
	

2. transform-origin 属性: 设置旋转元素的基点位置：[查看样例](http://www.w3school.com.cn/tiy/t.asp?f=css3_transform-origin)
	- 0%，0% 的位置是以 左下角为参照点，默认是 50%，50%！
3. transform-style 属性规定如何在 3D 空间中呈现被嵌套的元素。
	- transform-style: flat（不保留其 3D 位置）|preserve-3d（保留其 3D 位置）;
4. backface-visibility 属性定义当元素不面向屏幕时是否可见。
如果在旋转元素不希望看到其背面时，该属性很有用。
	- backface-visibility: visible|hidden;




## 参考：
1. http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/（动画及渲染）
