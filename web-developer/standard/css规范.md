#前端规范——CSS部分
### 约定
出现 *[强制]* 是强制性的，其他的字眼的表示只是作为建议，非强制； 


##语法：
1. 用两个空格来代替制表符（tab） -这是唯一能保证在所有环境下获得一致展现的方法。
2. 为选择器分组时，将单独的选择器单独放在一行。
3. 为了代码的易读性，在每个声明块的左花括号前添加一个空格。
4. 声明块的右花括号应当单独成行。
5. 每条声明语句的 : 后应该插入一个空格。
6. 为了获得更准确的错误报告，每条声明都应该独占一行。
7. 所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错。
8. 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow）。
9. 不要在 rgb()、rgba()、hsl()、hsla() 或 rect() 值的内部的逗号后面插入空格。这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。
10. 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替-0.5px）。
11. 十六进制值应该全部小写，例如，#fff。在扫描文档时，小写字符易于分辨，因为他们的形式更易于区分。
12. 尽量使用简写形式的十六进制值，例如，用 #fff 代替 #ffffff
13. 为选择器中的属性添加双引号，例如，input[type="text"]。只有在某些情况下是可选的，但是，为了代码的一致性，建议都加上双引号。
14. 避免为 0 值指定单位，例如，用 margin: 0; 代替 m argin: 0px;。
15. * CSS模块化（对应着HTML的模块化，参考`前端规范 - HTML`），CSS样式的选择器的最前面都应该是模块的CLASS选择器（公共部分除外），例如：

		.mod-xxx .part-seller p{
			margin-left: 10px;
		}
		.mod-xxx .part-offer span{
			font-size: 10px;
		}

 并且同一个模块的所有样式在样式文件中写在一起；
 **可以使用less/sass等工具来更轻松地实现这个要求**
	* CLASS命名语义化（具有业务意义），采用小写字母及数字，使用连字符`-`进行连接；
	* 选择器的嵌套不要超过4级；
	* *[建议]* ID上不要承载样式；
	* *[建议]* 少用!important；
	* *[建议]* 避免使用`*`选择器；
	* *[建议]* CSS属性的书写顺序是：`显示属性->盒模型属性->文本属性的书写顺序`
	* *[建议]* 如果一条规则有多个选择器，每个选择器一行；
	* *[建议]* 每个CSS属性的键值对占一行；
	
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

##声明顺序
1. 相关的属性声明应当归为一组，并按照下面的顺序排列：
	- Positioning
	- Box model
	- Typographic
	- Visual
2. 由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

3. 其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。

```css
.declaration-order {
    /* Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    /* Box-model */
    display: block;
    float: right;
    width: 100px;
    height: 100px;

    /* Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #333;
    text-align: center;

    /* Visual */
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 3px;

    /* Misc */
    opacity: 1;
}
```

## 不要使用 @import
1. 与 `<link>` 标签相比，`@import` 指令要慢很多，不光增加了额外的请求次数，还会导致不可预料的问题。替代办法有以下几种：
	- 使用多个<link>元素
	- 通过 Sass 或 Less 类似的 CSS 预处理器将多个 CSS 文件编译为一个文件
	- 通过 Rails、Jekyll 或其他系统中提供过 CSS 文件合并功能

## 媒体查询（Media query）的位置
将媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果你把他们分开了，将来只会被大家遗忘。下面给出一个典型的实例。

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

## 单行规则声明
对于只包含一条声明的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行。

这样做的关键因素是为了错误检测 -- 例如，CSS 校验器指出在 183 行有语法错误。如果是单行单条声明，你就不会忽略这个错误；如果是单行多条声明的话，你就要仔细分析避免漏掉错误了。

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

## class 命名
1. class 名称中只能出现小写字符和破折号（dashe）（不是下划线，也不是驼峰命名法）。破折号应当用于相关 class 的命名（类似于命名空间）（例如，.btn和 .btn-danger）。
2. 避免过度任意的简写。.btn 代表 button，但是.s 不能表达任何意思。
3. class 名称应当尽可能短，并且意义明确。使用有组织的或目的明确的名称，不要使用表现形式（presentational）的名称。
4. 基于最近的父 class 或基本（base） class 作为新 class 的前缀。


## 选择器
对于通用元素使用 class ，这样利于渲染性能的优化。
对于经常出现的组件，避免使用属性选择器（例如，[class^="..."]）。浏览器的性能会受到这些因素的影响。
选择器要尽可能短，并且尽量限制组成选择器的元素个数，建议不要超过 3 。
避免不必要的 CSS 选择符嵌套。只有在必要的时候才将 class 限制在最近的父元素内（也就是后代选择器）（例如，不使用带前缀的 class 时 -- 前缀类似于命名空间）。

如果Class 已经模块化命名，从类名上已经可以清晰的分辨元素的从属，一般情况下也不会造成类名冲突，没有必要再进行选择器嵌套，保持 css 结构清晰，提高渲染效率。特殊情况可以嵌套（如提高权重、主题之间代码隔离），但应避免过多层级。

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

## 代码组织
以组件为单位组织代码段。
制定一致的注释规范。
使用一致的空白符将代码分隔成块，这样利于扫描较大的文档。
如果使用了多个 CSS 文件，将其按照组件而非页面的形式分拆，因为页面会被重组，而组件只会被移动。
注释
代码是由人编写并维护的。请确保你的代码能够自描述、注释良好并且易于他人理解。好的代码注释能够传达上下文关系和代码目的。不要简单地重申组件或 class 名称。 对于较长的注释，务必书写完整的句子；对于一般性注解，可以书写简洁的短语。