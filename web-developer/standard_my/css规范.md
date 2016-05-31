#前端规范——CSS部分(补充部分)

## z-index

1. 将 z-index 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理。
	- 同层的多个元素，如多个由用户输入触发的 Dialog，在该层级内使用相同的 z-index 或递增 z-index。

	- 建议每层包含100个 z-index 来容纳足够的元素，如果每层元素较多，可以调整这个数值。

2. 在可控环境下，期望显示在最上层的元素，z-index 指定为 999999。

	- 可控环境分成两种，一种是自身产品线环境；还有一种是可能会被其他产品线引用，但是不会被外部第三方的产品引用。

	- 不建议取值为 2147483647。以便于自身产品线被其他产品线引用时，当遇到层级覆盖冲突的情况，留出向上调整的空间。

3. 在第三方环境下，期望显示在最上层的元素，通过标签内联和 !important，将 z-index 指定为 2147483647。
	- 第三方环境对于开发者来说完全不可控。在第三方环境下的元素，为了保证元素不被其页面其他样式定义覆盖，需要采用此做法。
	
	
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

