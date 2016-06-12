#前端规范——HTML部分

##为何需要规范？

1. 坚持一致原则
	- 风格统一了，就有了一个共同思维的环境，参与者就可以专注的看你要说什么。 
	- 团队永远遵循同一套编码规范，使代码风格保持一致，容易被理解和被维护。

### 约定
出现 *[强制]* 是强制性的，其他的字眼的表示只是作为建议，非强制； 


##语法：
1. *[强制]*用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。
2. 嵌套元素应当缩进一次（即两个空格)。
3. *[强制]*对于属性的定义，确保全部使用双引号，绝不要使用单引号。
4. *[强制]*对于无需自闭合的标签，不允许自闭合。-- HTML5 规范中明确说明这是可选的。[点这里查看详细](http://www.impng.com/web-dev/html-tags-without-self-closing.html)
	 - 常见无需自闭合标签： area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track, wbr
	
	```html
	<!-- good -->
	<input type="text" name="title">
	
	<!-- bad -->
	<input type="text" name="title" />
	```
	 
5. *[强制]*对 HTML5 中规定允许省略的闭合标签，不允许省略闭合标签(对代码体积要求非常严苛的场景，可以例外。比如：第三方页面使用的投放系统。)（例如，`</li> 或 </body>`）。
	
	```html
	<!-- good -->
	<ul>
	    <li>first</li>
	    <li>second</li>
	</ul>
	
	<!-- bad -->
	<ul>
	    <li>first
	    <li>second
	</ul>
	```
7. *[强制]*标签使用必须符合标签嵌套规则。
  > 比如 div 不得置于 p 中，tbody 必须置于 table 中。

8. 技术不支持的时候使用canvas,flash等

##页面结构如下所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <title></title>
</head>
<body>
<!--公共头部-->
<div id="header"></div>

<!--内容区-->
<div id="content">

  <!--一个横向布局-->
  <div class="layout">

    <!--一个模块-->
    <div class="mod-xx">

      <!--模块头-->
      <div class="mod-header"></div>

      <!--模块内容区-->
      <div class="mod-content">
        <!--可以将内容划分为多个part-->
        <div class="part-yy1"></div>
        <div class="part-yy2"></div>
      </div>

      <!--模块底部-->
      <div class="mod-footer"></div>

    </div>
  </div>

</div>

<!--公共底部-->
<div id="footer"></div>

</body>
</html>

```
* *[强制]*`页面整体` 分为 `公共头部`， `内容区`， `公共底部`三大块；
* *[强制]*`内容区`中包含`布局（layout）`，可以包含多个`布局`；
* *[强制]*`布局`中包含`模块`，可以包含多个`模块`；
* *[强制]*`模块`有一个CLASS值以`mod-`作为前缀或者以这个页面的功能为前缀；
* `模块`分为`模块头部`，`模块内容区`，`模块底部`三个部分，分别对应CLASS值`mod-header`，`mod-content`，`mod-footer`；
* `模块内容区`中的内容可以划分为多个`部分（part）`，各个`部分`有一个CLASS值以`part-`作为前缀；

##编码
1.  *[强制]*HTML5 doctype
为每个 HTML 页面的第一行添加标准模式（standard mode）的声明，这样能够确保在每个浏览器中拥有一致的展现。

	```html
	<!DOCTYPE html>
	<html>
	  <head>
	  </head>
	</html>
	```	

2. 语言属性，根据 HTML5 规范：

  > 强烈建议为 html 根元素指定 lang 属性，从而为文档设置正确的语言。这将有助于语音合成工具确定其所应该采用的发音，有助于翻译工具确定其翻译时所应遵守的规则等等。

  更多关于` lang `属性的知识可以从 [此规范](http://w3c.github.io/html/semantics.html#the-html-element) 中了解。
	
	```html
	<html lang="zh-CN">
	  <!-- ... -->
	</html>
	```

3.  *[强制]*页面必须使用精简形式，明确指定字符编码。指定字符编码的 meta 必须是 head 的第一个直接子元素。通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 UTF-8 编码）。

	```html
	<html>
	    <head>
	        <meta charset="UTF-8">
	        ......
	    </head>
	    <body>
	        ......
	    </body>
	</html>
	```

4.  *[强制]* IE 兼容模式
IE 支持通过特定的 <meta> 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式。[点这里看具体](http://www.cnblogs.com/nidilzhang/archive/2010/01/09/1642887.html)。

	```html
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	```
5. [建议] 在 head 中引入页面需要的所有 CSS 资源。 ----在页面渲染的过程中，新的CSS可能导致元素的样式重新计算和绘制，页面闪烁。
6. [建议]JavaScript 应当放在页面末尾，或采用异步加载。----将 script 放在页面中间将阻断页面的渲染。出于性能方面的考虑，如非必要，请遵守此条建议。

	```html
	<body>
	    <!-- a lot of elements -->
	    <script src="init-behavior.js"></script>
	</body>
	```
7. 移动环境或只针对现代浏览器设计的 Web 应用，如果引用外部资源的 URL 协议部分与页面相同，建议省略协议前缀。 
	- 嵌入式资源书写省略协议头
	- 省略图像、媒体文件、样式表和脚本等URL协议头部声明 ( http: , https: )。如果不是这两个声明的URL则不省略。
	- 省略协议声明，使URL成相对地址，防止内容混淆问题和导致小文件重复下载。
	> 使用 protocol-relative URL 引入 CSS，在 IE7/8 下，会发两次请求。是否使用 protocol-relative URL 应充分考虑页面针对的环境。
	
	```html
	<script src="//s1.bdstatic.com/cache/static/jquery-1.10.2.min_f2fb5194.js"></script>
	```



##引入 CSS 和 JavaScript 文件
根据 HTML5 规范，在引入 CSS 和 JavaScript 文件时一般不需要指定 type 属性，因为text/css 和 text/javascript 分别是它们的默认值。

```html
<!-- External CSS -->
<link rel="stylesheet" href="code-guide.css">
<!-- In-document CSS -->
<style>
  /* ... */
</style>
<!-- JavaScript -->
<script src="code-guide.js"></script>
```

##属性顺序
HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。

- class
- id, name
- data-*
- src, for, type, href
- title, alt
- aria-*, role

class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。

```html
<a class="..." id="..." data-modal="toggle" href="#">
    Example link
</a>
<input class="form-control" type="text">
<img src="..." alt="...">
```

##布尔（boolean）型属性
布尔型属性可以在声明时不赋值。XHTML 规范要求为其赋值，但是 HTML5 规范不需要。 更多信息请参考 [WhatWG section on boolean attributes](https://html.spec.whatwg.org/multipage/infrastructure.html#common-microsyntaxes)： 

**元素的布尔型属性如果有值，就是 true，如果没有值，就是 false**

如果一定要为其赋值的话，请参考 WhatWG 规范：

**如果属性存在，其值必须是空字符串或 [...] 属性的规范名称，并且不要再收尾添加空白符。**

简单来说，就是不用赋值。

```html
<input type="text" disabled>
<input type="checkbox" value="1" checked>
<select>
  <option value="1" selected>1</option>
</select>
```

## 减少标签的数量
编写 HTML 代码时，标签的使用应尽量简洁，尽量避免多余的父元素。很多时候，这需要迭代和重构来实现。请看下面的案例：

```html
<!-- Not so great -->
<span class="avatar">
  <img src="...">
</span>

<!-- Better -->
<img class="avatar" src="...">
```

## 图片
1.  *[强制]*禁止 img 的 src 取值为空。延迟加载的图片也要增加默认的 src。
	 - src 取值为空，会导致部分浏览器重新加载一次当前页面，参考：https://developer.yahoo.com/performance/rules.html#emptysrc

2. 避免为 img 添加不必要的 title 属性。
 	 - 多余的 title 影响看图体验，并且增加了页面尺寸。

3. 为重要图片添加 alt 属性。
	 - 可以提高图片加载失败时的用户体验。

4.  *[强制]*添加 width 和 height 属性，以避免页面抖动。

5. 有下载需求的图片采用 img 标签实现，无下载需求的图片采用 CSS 背景图实现。
	 - 产品 logo、用户头像、用户产生的图片等有潜在下载需求的图片，以 img 形式实现，能方便用户下载。
	 - 无下载需求的图片，比如：icon、背景、代码使用的图片等，尽可能采用 css 背景图实现。


##表单
1.  *[强制]*控件标题: 有文本标题的控件必须使用 label 标签将其与其标题相关联。
	 - 有两种方式：
	 	- 将控件置于 label 内。
	 	- label 的 for 属性指向控件的 id。
 	 - 推荐使用第一种，减少不必要的 id。如果 DOM 结构不允许直接嵌套，则应使用第二种。
 	 
	```html
	<label><input type="checkbox" name="confirm" value="on"> 我已确认上述条款</label>
	
	<label for="username">用户名：</label> <input type="textbox" name="username" id="username">
	
	```

2. 按钮： 使用 button 元素时必须指明 type 属性值。
	 - button 元素的默认 type 为 submit，如果被置于 form 元素中，点击后将导致表单提交。为显示区分其作用方便理解，必须给出 type 属性。
	 
	```html
	<button type="submit">提交</button>
	<button type="button">取消</button>
	```
3. 尽量不要使用按钮类元素的 name 属性。
	 - 由于浏览器兼容性问题，使用按钮的 name 属性会带来许多难以发现的问题。具体情况可参考此文。
	 - 同一页面，应避免使用相同的 name 与 id。
	 	 - IE 浏览器会混淆元素的 id 和 name 属性， document.getElementById 可能获得不期望的元素。所以在对元素的 id 与 name 属性的命名需要非常小心。
 	 - 一个比较好的实践是，为 id 和 name 使用不同的命名法。

	```html
	<input name="foo">
	<div id="foo"></div>
	<script>
	// IE6 将显示 INPUT
	alert(document.getElementById('foo').tagName);
	</script>
	```

4. 可访问性 (A11Y)
	 - 负责主要功能的按钮在 DOM 中的顺序应靠前。
	 - 负责主要功能的按钮应相对靠前，以提高可访问性。如果在 CSS 中指定了 float: right 则可能导致视觉上主按钮在前，而 DOM 中主按钮靠后的情况。
	
	```html
	<!-- good -->
	<style>
	.buttons .button-group {
	    float: right;
	}
	</style>
	
	<div class="buttons">
	    <div class="button-group">
	        <button type="submit">提交</button>
	        <button type="button">取消</button>
	    </div>
	</div>
	
	<!-- bad -->
	<style>
	.buttons button {
	    float: right;
	}
	</style>
	
	<div class="buttons">
	    <button type="button">取消</button>
	    <button type="submit">提交</button>
	</div>
	```

5. 当使用 JavaScript 进行表单提交时，如果条件允许，应使原生提交功能正常工作。
	 - 当浏览器 JS 运行错误或关闭 JS 时，提交功能将无法工作。如果正确指定了 form 元素的 action 属性和表单控件的 name 属性时，提交仍可继续进行。

	```html
	<form action="/login" method="post">
	    <p><input name="username" type="text" placeholder="用户名"></p>
	    <p><input name="password" type="password" placeholder="密码"></p>
	</form>
	```
6. 在针对移动设备开发的页面时，根据内容类型指定输入框的 type 属性。
	 - 根据内容类型指定输入框类型，能获得能友好的输入体验。

	```html
	<input type="date">
	```


## 多媒体
1. 当在现代浏览器中使用 audio 以及 video 标签来播放音频、视频时，应当注意格式。
	 - 音频应尽可能覆盖到如下格式：
		 - MP3
		 - WAV
		 - Ogg
	 - 视频应尽可能覆盖到如下格式：
	 	- MP4
	 	- WebM
	 	- Ogg
2. 在支持 HTML5 的浏览器中优先使用 audio 和 video 标签来定义音视频元素。
3. 使用退化到插件的方式来对多浏览器进行支持。
	
	```html
	<audio controls>
	    <source src="audio.mp3" type="audio/mpeg">
	    <source src="audio.ogg" type="audio/ogg">
	    <object width="100" height="50" data="audio.mp3">
	        <embed width="100" height="50" src="audio.swf">
	    </object>
	</audio>
	
	<video width="100" height="50" controls>
	    <source src="video.mp4" type="video/mp4">
	    <source src="video.ogg" type="video/ogg">
	    <object width="100" height="50" data="video.mp4">
	        <embed width="100" height="50" src="video.swf">
	    </object>
	</video>
	```
4. 只在必要的时候开启音视频的自动播放。
5. 在 object 标签内部提供指示浏览器不支持该标签的说明。
	
	```html
	<object width="100" height="50" data="something.swf">DO NOT SUPPORT THIS TAG</object>
	```


##JavaScript 生成的标签
通过 JavaScript 生成的标签让内容变得不易查找、编辑，并且降低性能。能避免时尽量避免。


##命名注意事项
1. *[强制]*语义化，望文见义如 capacity-tab、capacity-nav，不要使用 red、left 等表象的词命名。即class 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名。

	```html
	<!-- good -->
	<div class="sidebar"></div>
	
	<!-- bad -->
	<div class="left"></div>
	```


2. 模块状态： {命名空间}-{模块名}-{状态描述}常用状态有：hover, current, selected, disabled, focus, blur, checked, success, error 等

3. 子模块： {命名空间}-{模块名}-{子模块名}

	常用模块名有以下词义表达组件要实现的功能。
	
	- bd(body)，
	- cnt(content)，
	- hd(header)，
	- text(txt)，
	- img(images/pic)，
	- title，item，cell 

4. 模块嵌套：

	```html
	<ul class="am-nav">
	    <li class="am-nav-item">
	        <a href="#">nav Triggle Link</a>
	        <ul class="am-subnav">
	            <li class="am-subnav-item">
	                <a href="#">subNav Triggle Link</a>
	                    <ul class="am-list">
	                    
	```

5. *[强制]*统一命名风格（使用相同名词命名不同组件的子元素）：如 am-tab-hd, am-modal-hd，便于理解。
6. *[强制]*class 必须单词全字母小写，单词间以 - 分隔。
7.*[强制]* 元素 id 必须保证页面唯一,且不用id去控制样式，通过使用css优先级去控制。
 	 - 同一个页面中，不同的元素包含相同的 id，不符合 id 的属性含义。并且使用 document.getElementById 时可能导致难以追查的问题。
 	 - id 建议单词全字母小写，单词间以 - 分隔。同项目必须保持风格一致。


##解释你写的代码。
用注释来解释代码：它包括什么，它的目的是什么，它能做什么，为什么使用这个解决方案，还是说只是因为偏爱如此呢？---增加项目的可维护性。

没必要每份代码都描述的很充分，适当的解说。---注释贵精不贵多，这也可以让自己及他人看代码时，更快的理解思路。

##模块化编写(将 HTML、CSS 解耦；模块化编码。)
1. 语义化的模块名，通过模块名应该能一眼就看出模块的是干什么的。
2. 模块内部的类名继承自父级。

	```html
	<div class="capacity-box">
	   <h2 class="capacity-box-hd">About the Site</h2>
	   <p class="capacity-box-bd">
	This is my blog where I talk about only the bestest things in the whole wide world.
	   </p>
	</div>
	```

 上面的代码中，模块的名为 box，模块最外层使用 {命名空间}-{模块名} 的方式命名 Class。模块子元素以在此基础上进行命名。如果不继承父级的类名，很容易造成命名冲突。

3. 充分考虑结构的语义化

虽然在 Class 的命名上已经做到的了关注分离，编写样式不再依赖具体的元素名称，但仍应该考虑语义化，根据元素设计的目的来使用元素。是段落的，你就用` <p>`；是标题的，就用` <h1>~<h6>`；是引用的，就用 `<blockquote>`， 而不是简单粗暴的用 `<div>、<span>`。语义化的目的，一方面是抽去 CSS 以后，页面还是一个结构良好、可读的页面；另一方面，这也是 SEO 的最基本要求。

4. 与 JS 交互时，在模块 HTML 结构的最外一层添加状态，而非给模块每个子元素单独添加元素。给最外层添加状态类以后，整个模块的样式都能控制，减少操作，提高性能。

	```html
	/* 推荐写法 */
	<div class="capacity-box capacity-box-active">
	   <h3 class="capacity-box-title"></h3>
	   <p class="capacity-box-content"></p>
	</div>
	
	/* 不推荐写法 */
	<div class="capacity-box">
	   <h3 class="capacity-box-title capacity-box-title-active"></h3>
	   <p class="capacity-box-content capacity-box-content-active"></p>
	</div>
	```


##模板中的 HTML
1. 模板代码的缩进优先保证 HTML 代码的缩进规则。

	```html
	<!-- good -->
	{if $display == true}
	<div>
	    <ul>
	    {foreach $item_list as $item}
	        <li>{$item.name}<li>
	    {/foreach}
	    </ul>
	</div>
	{/if}
	
	<!-- bad -->
	{if $display == true}
	    <div>
	        <ul>
	    {foreach $item_list as $item}
	        <li>{$item.name}<li>
	    {/foreach}
	        </ul>
	    </div>
	{/if}
	```html

2. 模板代码应以保证 HTML 单个标签语法的正确性为基本原则。

	```html
	<!-- good -->
	<li class="{if $item.type_id == $current_type}focus{/if}">{ $item.type_name }</li>
	
	<!-- bad -->
	<li {if $item.type_id == $current_type} class="focus"{/if}>{ $item.type_name }</li>
	```

3. 在循环处理模板数据构造表格时，若要求每行输出固定的个数，建议先将数据分组，之后再循环输出。

	```html
	<!-- good -->
	<table>
	    {foreach $item_list as $item_group}
	    <tr>
	        {foreach $item_group as $item}
	        <td>{ $item.name }</td>
	        {/foreach}
	    <tr>
	    {/foreach}
	</table>
	
	<!-- bad -->
	<table>
	<tr>
	    {foreach $item_list as $item}
	    <td>{ $item.name }</td>
	        {if $item@iteration is div by 5}
	    </tr>
	    <tr>
	        {/if}
	    {/foreach}
	</tr>
	</table>
	```


##参考：
1. http://codeguide.bootcss.com/
2. https://github.com/fex-team/styleguide/blob/master/html.md
3. http://www.impng.com/web-dev/html-tags-without-self-closing.html
4. http://www.cnblogs.com/nidilzhang/archive/2010/01/09/1642887.html