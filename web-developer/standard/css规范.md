#前端规范——CSS部分

### 约定
出现 *[强制]* 是强制性的，其他的字眼的表示只是作为建议，非强制； 


## 代码组织
1. 以组件为单位组织代码段。
2. 制定一致的注释规范。
	- 代码是由人编写并维护的。请确保你的代码能够自描述、注释良好并且易于他人理解。好的代码注释能够传达上下文关系和代码目的。不要简单地重申组件或 class 名称。 
	- 对于较长的注释，务必书写完整的句子；
	- 对于一般性注解，可以书写简洁的短语。

3. 使用一致的空白符将代码分隔成块，这样利于扫描较大的文档。
4. 如果使用了多个 CSS 文件，将其按照组件而非页面的形式分拆，因为页面会被重组，而组件只会被移动。


## 语法：
1. 用两个空格来代替制表符（tab） -这是唯一能保证在所有环境下获得一致展现的方法。
2. *[强制]* url() 函数中的路径
	- url() 函数中的绝对路径可省去协议名。
	- url() 函数中的路径不加引号。
3. *[强制]* 为了代码的易读性，在每个声明块的左花括号前添加一个空格。即选择器 与 { 之间必须包含空格。

	```css
	.selector {
	}
	```
4. *[强制]* 声明块的右花括号应当单独成行。(见上示例)
5. *[强制]* 属性名 与之后的 : 之间不允许包含空格， : 与 属性值 之间必须包含空格。

	```css
	margin: 0;
	```
6. *[强制]* >、+、~ 选择器的两边各保留一个空格。

	```css
	/* good */
	main > nav {
	    padding: 10px;
	}
	
	input:checked ~ button {
	    background-color: #69C;
	}
	
	/* bad */
	main>nav {
	    padding: 10px;
	}
	
	input:checked~button {
	    background-color: #69C;
	}
		
	```

7. *[强制]* 所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错。
8. 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow，font-family）。

	```css
	font-family: Arial, sans-serif;
	```

9. 不要在 rgb()、rgba()、hsl()、hsla() 或 rect() 值的内部的逗号后面插入空格。这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。
10. 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替-0.5px）。
11. 十六进制值应该全部小写，例如，#fff。在扫描文档时，小写字符易于分辨，因为他们的形式更易于区分。
	- 颜色值不允许使用命名色值。
12. 尽量使用简写形式的十六进制值，例如，用 #fff 代替 #ffffff
13. 为选择器中的属性添加双引号，例如，input[type="text"]。只有在某些情况下是可选的，但是，为了代码的一致性，建议都加上双引号。
14. *[强制]* 避免为 0 值指定单位，例如，用 margin: 0; 代替 m argin: 0px;。
15. CSS模块化（对应着HTML的模块化，参考[html规范](./html规范.md)），CSS样式的选择器的最前面都应该是模块的CLASS选择器（公共部分除外），并且同一个模块的所有样式在样式文件中写在一起；
 
 **可以使用less/sass等工具来更轻松地实现这个要求**
	
	```css
	.mod-xxx .part-seller p{
		margin-left: 10px;
	}
	.mod-xxx .part-offer span{
		font-size: 10px;
	}
	```

16. *[建议]* ID上不要承载样式；
17. 2D 位置：必须同时给出水平和垂直方向的位置。
	- 2D 位置初始值为 0% 0%，但在只有一个方向的值时，另一个方向的值会被解析为 center。为避免理解上的困扰，应同时给出两个方向的值。[background-position属性值的定义](https://www.w3.org/TR/CSS21/colors.html#propdef-background-position)

	```css
	/* good */
	body {
	    background-position: center top; /* 50% 0% */
	}
	
	/* bad */
	body {
	    background-position: top; /* 50% 0% */
	}
	```
21. *[建议]* 对于超长的样式，在样式值的 `空格 `处或` , `后换行，建议按逻辑分组。

	```css
	/* 不同属性值按逻辑分组 */
	background:
	    transparent url(aVeryVeryVeryLongUrlIsPlacedHere)
	    no-repeat 0 0;
	
	/* 可重复多次的属性，每次重复一行 */
	background-image:
	    url(aVeryVeryVeryLongUrlIsPlacedHere)
	    url(anotherVeryVeryVeryLongUrlIsPlacedHere);
	
	/* 类似函数的属性值可以根据函数调用的缩进进行 */
	background-image: -webkit-gradient(
	    linear,
	    left bottom,
	    left top,
	    color-stop(0.04, rgb(88,94,124)),
	    color-stop(0.52, rgb(115,123,162))
	);	
	```

	
```css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
    padding:15px;
    margin:0px 0px 15px;
    background-color:rgba(0, 0, 0, 0.5);
    box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
    padding: 15px;
    margin-bottom: 15px;
    background-color: rgba(0,0,0,.5);
    box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

## 选择器
1. 避免使用`*`选择器；
2. 对于通用元素使用 class ，这样利于渲染性能的优化。
3. 对于经常出现的组件，避免使用属性选择器（例如，[class^="..."]）。浏览器的性能会受到这些因素的影响。
	- 如果使用的话，属性选择器中的值必须用双引号包围。

	```css
	/* good */
	article[character="juliet"] {
	    voice-family: "Vivien Leigh", victoria, female
	}
	
	/* bad */
	article[character='juliet'] {
	    voice-family: "Vivien Leigh", victoria, female
	}	
	```
4. 选择器要尽可能短，并且尽量限制组成选择器的元素个数，建议不要超过 4 级，位置靠后的限定条件应尽可能精确。
5. 避免不必要的 CSS 选择符嵌套。只有在必要的时候才将 class 限制在最近的父元素内（也就是后代选择器）（例如，不使用带前缀的 class 时 -- 前缀类似于命名空间）。

	```css
	/* 推荐写法 */
	.capacity-box {
	    border: 1px solid #333;
	}
	.capacity-box-hd {
	    margin: 0;
	    padding: 5px 10px;
	    border-bottom: 1px solid #333;
	    background-color: #CCC;
	}
	.capacity-box-bd {
	    margin: 10px;
	}
	
	/* 不推荐写法 */
	.capacity-box .capacity-box-hd {}
	.capacity-box .capacity-box-bd {}
	```

6. 如果Class 已经模块化命名，从类名上已经可以清晰的分辨元素的从属，一般情况下也不会造成类名冲突，没有必要再进行选择器嵌套，保持 css 结构清晰，提高渲染效率。特殊情况可以嵌套（如提高权重、主题之间代码隔离），但应避免过多层级。
7. 如无必要，class 选择器前不必添加`标签选择器`进行限定。
	- 在性能和维护性上，都有一定的影响。

	```css
	/* good */
	#error,
	.danger-message {
	    font-color: #c00;
	}
	
	/* bad */
	dialog#error,
	p.danger-message {
	    font-color: #c00;
	}
	```

## class 命名
1. *[强制]* CLASS命名语义化（具有业务意义），采用小写字母及数字，使用连字符`-`进行连接（不是下划线，也不是驼峰命名法）。破折号应当用于相关 class 的命名（类似于命名空间）（例如，.btn和 .btn-danger）。
2. 避免过度任意的简写。.btn 代表 button，但是.s 不能表达任何意思。
3. class 名称应当尽可能短，并且意义明确。
4. 使用有组织的或目的明确的名称，不要使用表现形式（presentational）的名称。
5. 基于最近的父 class 或基本（base） class 作为新 class 的前缀。
6. 使用 .js-* class 来标识行为（与样式相对），并且不要将这些 class 包含到 CSS 文件中。

## 单行规则声明：
1. 为选择器分组时，将单独的选择器单独放在一行。
2. *[强制]* 为了获得更准确的错误报告，每条声明都应该独占一行。
	- 对于只包含一条声明的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行。
	- 这样做的关键因素是为了错误检测 -- 例如，CSS 校验器指出在 183 行有语法错误。如果是单行单条声明，你就不会忽略这个错误；如果是单行多条声明的话，你就要仔细分析避免漏掉错误了。
	
	```css
	/* Single declarations on one line */
	.span1 { width: 60px; }
	.span2 { width: 140px; }
	.span3 { width: 220px; }
	
	/* Multiple declarations, one per line */
	.sprite {
	  display: inline-block;
	  width: 16px;
	  height: 15px;
	  background-image: url(../img/sprite.png);
	}
	```

## 属性缩写
1. 在可以使用缩写的情况下，尽量使用属性缩写。

	```css
	/* good */
	.post {
	    font: 12px/1.5 arial, sans-serif;
	}
	
	/* bad */
	.post {
	    font-family: arial, sans-serif;
	    font-size: 12px;
	    line-height: 1.5;
	}
```
2. 使用 border / margin / padding 等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。
	- border / margin / padding 等缩写会同时设置多个属性的值，容易覆盖不需要覆盖的设定。如某些方向需要继承其他声明的值，则应该分开设置。

	```css
	/* centering <article class="page"> horizontally and highlight featured ones */
	article {
	    margin: 5px;
	    border: 1px solid #999;
	}
	
	/* good */
	.page {
	    margin-right: auto;
	    margin-left: auto;
	}
	
	.featured {
	    border-color: #69c;
	}
	
	/* bad */
	.page {
	    margin: 5px auto; /* introducing redundancy */
	}
	
	.featured {
	    border: 1px solid #69c; /* introducing redundancy */
	}
	```   

## 声明顺序
1. 同一 rule set 下的属性在书写时，应按功能进行分组，并以 Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果） 的顺序书写，以提高代码的可读性。
	- Formatting Model 相关属性包括：position / top / right / bottom / left / float / display / overflow 等
	
	- Box Model 相关属性包括：border / margin / padding / width / height 等
	
	- Typographic 相关属性包括：font / line-height / text-align / word-wrap 等
	
	- Visual 相关属性包括：background / color / transition / list-style 等

2. 由于定位（Formatting Model）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

3. 其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。

```css
.declaration-order {
    /* Formatting Model */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: block;
    float: right;
    
    /* Box-model */
    width: 100px;
    padding: 5px;
    border: 1px solid #ddd;

    /* Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #333;
    text-align: center;

    /* Visual */
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
	-webkit-transition: color 1s;
	       -moz-transition: color 1s;
            transition: color 1s;
            
    /* Misc */
    opacity: 1;
}
```

## 清除浮动
1. 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 clear 或触发 BFC 的方式进行 clearfix。尽量不使用增加空标签的方式。
	- 触发 BFC 的方式很多，常见的有：
		- float 非 none
		- position 非 static
		- overflow 非 visible
		- display :行内块状样式的情况下：inline-block,
	- 如希望使用更小副作用的清除浮动方法，参见 [A new micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/) 一文。
	- 另需注意，对已经触发 BFC 的元素不需要再进行 clearfix。

## 尽量不使用 !important 声明
1. 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 !important 定义样式。
	- 必须注意的是，仅在设计上 确实不允许任何其它场景覆盖样式 时，才使用内联的 !important 样式。通常在第三方环境的应用中使用这种方案。

## z-index

1. 将 z-index 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理。
	- 同层的多个元素，如多个由用户输入触发的 Dialog，在该层级内使用相同的 z-index 或递增 z-index。

	- 建议每层包含100个 z-index 来容纳足够的元素，如果每层元素较多，可以调整这个数值。

2. 在可控环境下，期望显示在最上层的元素，z-index 指定为 999999。

	- 可控环境分成两种，一种是自身产品线环境；还有一种是可能会被其他产品线引用，但是不会被外部第三方的产品引用。

	- 不建议取值为 2147483647。以便于自身产品线被其他产品线引用时，当遇到层级覆盖冲突的情况，留出向上调整的空间。

3. 在第三方环境下，期望显示在最上层的元素，通过标签内联和 !important，将 z-index 指定为 2147483647。
	- 第三方环境对于开发者来说完全不可控。在第三方环境下的元素，为了保证元素不被其页面其他样式定义覆盖，需要采用此做法。
	
	
## 不要使用 @import
1. *[强制]* 与 `<link>` 标签相比，`@import` 指令要慢很多，不光增加了额外的请求次数，还会导致不可预料的问题。替代办法有以下几种：
	- 使用多个<link>元素
	- 通过 Sass 或 Less 类似的 CSS 预处理器将多个 CSS 文件编译为一个文件
	- 通过 Rails、Jekyll 或其他系统中提供过 CSS 文件合并功能

## 文本编排
1. 字体
	- font-family 属性中的字体族名称应使用字体的英文 Family Name，其中如有空格，须放置在引号中。
	
	```css
	h1 {
		font-family: "Helvetica Neue", Arial, "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft YaHei", sans-serif;
	}
	```
	- font-family 按「西文字体在前、中文字体在后」、「效果佳 (质量高/更能满足需求) 的字体在前、效果一般的字体在后」的顺序编写，最后必须指定一个通用字体族( serif / sans-serif )。[看这里-更详细的说明](https://www.zhihu.com/question/19911793/answer/13329819)
	- font-family 不区分大小写，但在同一个项目中，同样的 Family Name 大小写必须统一。
	
2. 字号
	- 需要在 Windows 平台显示的中文内容，其字号应不小于 12px。
		- 由于 Windows 的字体渲染机制，小于 12px 的文字显示效果极差、难以辨认。

3. 字体风格
	- 需要在 Windows 平台显示的中文内容，不要使用除 normal 外的 font-style。其他平台也应慎用。
		- 由于中文字体没有 italic 风格的实现，所有浏览器下都会 fallback 到 obilique 实现 (自动拟合为斜体)，小字号下 (特别是 Windows 下会在小字号下使用点阵字体的情况下) 显示效果差，造成阅读困难。

4. 字重
	- font-weight 属性必须使用数值方式描述。
	- CSS 的字重分 100 – 900 共九档，但目前受字体本身质量和浏览器的限制，实际上支持 400 和 700 两档，分别等价于关键词 normal 和 bold。
	- 浏览器本身使用一系列启发式规则来进行匹配，在 <700 时一般匹配字体的 Regular 字重，>=700 时匹配 Bold 字重。
	- 但已有浏览器开始支持 =600 时匹配 Semibold 字重 ([见此表](http://justineo.github.io/slideshows/font/#/3/15)，故使用数值描述增加了灵活性，也更简短。
	
	```css
	/* good */
	h1 {
	    font-weight: 700;
	}
	
	/* bad */
	h1 {
	    font-weight: bold;
	}
	```
	
5. 行高
	- line-height 在定义文本段落时，应使用数值。
	- 将 line-height 设置为数值，浏览器会基于当前元素设置的 font-size 进行再次计算。在不同字号的文本段落组合中，能达到较为舒适的行间间隔效果，避免在每个设置了 font-size 都需要设置 line-height。
	- 当 line-height 用于控制垂直居中时，还是应该设置成与容器高度一致。

	```css
	.container {
	    line-height: 1.5;
	}
	```

## 变换与动画
1. 使用 transition 时应指定 transition-property。
	
	```css
	/* good */
	.box {
	    transition: color 1s, border-color 1s;
	}
	
	/* bad */
	.box {
	    transition: all 1s;
	}
	```
2. 尽可能在浏览器能高效实现的属性上添加过渡和动画。
	- transform 和opacity 可以调用GPU 渲染动画。在可能的情况下应选择这样四种变换：
		- transform: translate(npx, npx);
		- transform: scale(n);
		- transform: rotate(ndeg);
		- opacity: 0..1;

	```css
	/* good */
	.box {
	    transition: transform 1s;
	}
	.box:hover {
	    transform: translate(20px); /* move right for 20px */
	}
	
	/* bad */
	.box {
	    left: 0;
	    transition: left 1s;
	}
	.box:hover {
	    left: 20px; /* move right for 20px */
	}
	```


## 媒体查询（Media query）的位置
1. 将媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果你把他们分开了，将来只会被大家遗忘。下面给出一个典型的实例。

	```css
	.element { ... }
	.element-avatar { ... }
	.element-selected { ... }
	
	@media (min-width: 480px) {
	  .element { ...}
	  .element-avatar { ... }
	  .element-selected { ... }
	}
	```
2. Media Query 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。

	```css
	@media
	(-webkit-min-device-pixel-ratio: 2), /* Webkit-based browsers */
	(min--moz-device-pixel-ratio: 2),    /* Older Firefox browsers (prior to Firefox 16) */
	(min-resolution: 2dppx),             /* The standard way */
	(min-resolution: 192dpi) {           /* dppx fallback */
	    /* Retina-specific stuff here */
	}
	```

3. 尽可能给出在高分辨率设备 (Retina) 下效果更佳的样式。

## 带前缀的属性
1. 当使用特定厂商的带有前缀的属性时，通过缩进的方式，带私有前缀的属性由长到短排列，按冒号位置对齐,让每个属性的值在垂直方向对齐，这样便于多行编辑。
	- 在 Textmate 中，使用 Text → Edit Each Line in Selection (⌃⌘A)。在 Sublime Text 2 中，使用 Selection → Add Previous Line (⌃⇧↑) 和 Selection → Add Next Line (⌃⇧↓)。		
		
	```css
	/* Prefixed properties */
	.selector {
	  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
	          box-shadow: 0 1px 2px rgba(0,0,0,.15);
	}
	```

## hack
1. 需要添加 hack 时应尽可能考虑是否可以采用其他方式解决。
	- 最好避免使用该死的CSS “hacks” —— 请先尝试使用其他的解决方法。
	- 虽然它很有诱惑力，可以当作用户代理检测或特殊的CSS过滤器，但它的行为太过于频繁，会长期伤害项目的效率和代码管理，所以能用其他的解决方案就找其他的。

2. 尽量使用 选择器 hack 处理兼容性，而非 属性 hack。
	- 尽量使用符合 CSS 语法的 selector hack，可以避免一些第三方库无法识别 hack 语法的问题。
	- 

	```css
	/* IE 7 */
	*:first-child + html #header {
	    margin-top: 3px;
	    padding: 5px;
	}
	
	/* IE 6 */
	* html #header {
	    margin-top: 5px;
	    padding: 4px;
	}
	```
	
3. 尽量使用简单的 属性 hack。

	```css
	.box {
	    _display: inline; /* fix double margin */
	    float: left;
	    margin-left: 20px;
	}
	
	.container {
	    overflow: hidden;
	    *zoom: 1; /* triggering hasLayout */
	}
	```
##参考：
1. https://github.com/Sandon/specs/blob/master/CSS%20specs.md
2. http://codeguide.bootcss.com/
3. https://github.com/fex-team/styleguide/blob/master/css.md
4. http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
5. http://blog.csdn.net/chajn/article/details/7538688