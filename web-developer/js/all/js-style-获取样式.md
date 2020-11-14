## 获取元素计算后的样式

1. style, 获取的是内联样式。其他获取不到。。。

	```html
	<p style="color: red; margin-left: 20px">
	This is a paragraph
	</p>
	```

2. Window.getComputedStyle()方法得出所有在应用有效的样式和分解任何可能会包含值的基础计算后的元素的CSS属性值。

	```js
	
	var div1 = document.getElementById('div1');
	var w1 = window.getComputedStyle( div1, null).getPropertyValue('width');
	var h1 = window.getComputedStyle( div1, null).getPropertyValue('height');
	console.log( w1 );
	console.log( h1 );
	
	```





## 参考
1. https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
2. https://github.com/fex-team/styleguide/blob/master/javascript.md#249-%E4%BA%8B%E4%BB%B6%E6%B3%A8%E9%87%8A