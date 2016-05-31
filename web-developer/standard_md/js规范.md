##前端规范——JS部分

## 语法：

1. *[强制]* 声明变量时，必须加上 var 关键字。
	- 不通过 var 定义变量将导致变量污染全局环境。
	- 每个 var 只能声明一个变量。
		- 一个 var 声明多个变量，容易导致较长的行长度，并且在修改时容易造成逗号和分号的混淆。 
	- 变量必须 即用即声明，不得在函数或其它形式的代码块起始位置统一声明所有变量。
		- 变量声明与使用的距离越远，出现的跨度越大，代码的阅读与维护成本越高。虽然JavaScript的变量是函数作用域，还是应该根据编程中的意图，缩小变量出现的距离空间。

	```js
	// good
	function kv2List(source) {
	    var list = [];
	
	    for (var key in source) {
	        if (source.hasOwnProperty(key)) {
	            var item = {...};
	            list.push(item);
	        }
	    }
	
	    return list;
	}
	
	// bad
	function kv2List(source) {
	    var list = [];
	    var key;
	    var item;
	
	    for (key in source) {
	        if (source.hasOwnProperty(key)) {
	            item = {...};
	            list.push(item);
	        }
	    }
	
	    return list;
	}
	```
2. *[强制]* 尽量减少全局变量的使用，必须使用时尽量将需要用的变量都绑定在一个全局对象下。

3. *[强制]* 使用分号作为语句结尾。

4. 在 Equality Expression 中使用类型严格的 ===。仅当判断 null 或 undefined 时，允许使用 == null。
	- 尽量少的使用==（会转换类型后，在匹配），性能考虑。
	- 使用 === 可以避免等于判断中隐式的类型转换。
	- 尽可能使用简洁的表达式。
	
	```js
	// 字符串为空
		
	// good
	if (!name) {
	    // ......
	}
	
	if (noValue == null) {
	// ......
	}
	
	// bad
	if (name === '') {
	    // ......
	}
	
	if (noValue === null || typeof noValue === 'undefined') {
	  // ......
	}
	```
5. *[强制]* 禁止使用 with。
	- 使用 with 可能会增加代码的复杂度，不利于阅读和管理；也会对性能有影响。大多数使用 with 的场景都能使用其他方式较好的替代。所以，尽量不要使用 with。

6. 尽量避免使用 eval 函数。
	- 直接 eval，指的是以函数方式调用 eval 的调用方法。直接 eval 调用执行代码的作用域为本地作用域，应当避免。

	- 如果有特殊情况需要使用直接 eval，需在代码中用详细的注释说明为何必须使用直接 eval，不能使用其它动态执行代码的方式，同时需要其他资深工程师进行 Code Review。

7. 减少 delete 的使用。
	- 如果没有特别的需求，减少或避免使用delete。delete的使用会破坏部分 JavaScript 引擎的性能优化。

	- 处理 delete 可能产生的异常。
		- 对于有被遍历需求，且值 null 被认为具有业务逻辑意义的值的对象，移除某个属性必须使用 delete 操作。

		- 在严格模式或IE下使用 delete 时，不能被删除的属性会抛出异常，因此在不确定属性是否可以删除的情况下，建议添加 try-catch 块。
	
	```js
	try {
	    delete o.x;
	}
	catch (deleteError) {
	    o.x = null;
	}
	```

8. 文件命名统一使用小写”.js”，同时推荐”-“而不是”_”
9. 标准特性优于非标准特性(如果类库有提供, 优先使用类库中的函数)。
10. 小心使用闭包以及不要循环引用。



## 编码规范
1. 缩进
	- 以 2 个空格为一缩进层次，代替制表符形式。

2. *[强制]* 命名规范
	- 变量命名规范
		- 全局变量使用g作为前缀+大驼峰法（upperCamelCase）命名， 如 `gUserName`
		- 常量全部大写，多个单词以下划线(\_)分隔，如 `USER_AGE`
			- 使用驼峰命名（如：camelCaseNames）以及大写的常量（如：UPPERCASE），避免使用const关键字，因为IE不支持
		- 普通变量使用小驼峰法（lowerCamelCase）命名， 如 `userAge`
		- 私有变量, 私有属性和私有方法, 名字以下划线（_）开头+小驼峰法（lowerCamelCase）命名,如 ` _setName`。
	- 函数命名规范使用小驼峰法（lowerCamelCase）命名，优先使用动词或者动词+名词形式。
	- 类名使用大驼峰法（upperCamelCase)命名,如： `TextNode`
	- 命名空间 使用 lowerCamelCase命名法
		- `equipments.heavyWeapons = {};`
	- boolean 类型的变量使用 is 或 has 开头。 `var isReady = false;`
	- Promise对象 用 动宾短语的进行时 表达。

	```js
	var loadingData = ajax.get('url');
	loadingData.then(callback);
	```
3. 单引号
	- 优先使用单引号，再使用双引号。只有在json文件中才使用双引号。

	- 使用分号： 不要省略语句末尾的分号。

4. *[强制]* 大括号
	- 用作代码块起始的左花括号 { 前必须有一个空格。
	- 表示区块起首的大括号，不要另起一行。

	```js
	/*推荐写法：*/
	return {
	  key: value
	};
	
	for (var i = 0; i < len; i++) {
	
	}
	
	/*不推荐写法*/
	return
	{
	  key: value
	};
	
	for (var i = 0; i < len; i++)
	{
	
	}
	```
5. *[强制]* 圆括号
 - 圆括号（parentheses）在Javascript中有两种作用，一种表示调用函数，另一种表示不同的值的组合（grouping）。我们可以用空格，区分这两种不同的括号。
	 
① 调用函数的时候，函数名与左括号之间没有空格。

   * 函数声明、具名函数表达式、函数调用中，函数名和 ( 之间不允许有空格。 `function each() {...}`, `var funcName = function funcName() {...};`,   `each();`

② 函数名与参数序列之间，没有空格。`each(ary, func)`

③ 所有其他语法元素与左括号之间，都有一个空格。

   * if / else / for / while / function / switch / do / try / catch / finally 关键字后，必须有一个空格。 
	
	```js
	/*推荐写法*/
	function each(ary, func) {
	    if (ary) {
	        var i;
	        for (i = 0; i < ary.length; i += 1) {
	            if (ary[i] && func(ary[i], i, ary)) {
	                break;
	            }
	        }
	    }
	}
	
	if (condition) {
	}
	
	while (condition) {
	}
	
	(function () {
	})();
		
	/*不推荐写法*/
	function each(ary, func) {
	    if(ary) {
	        var i;
	        for(i = 0; i < ary.length; i += 1) {
	            if(ary[i] && func(ary[i], i, ary)) {
	                break;
	            }
	        }
	    }
	}
	if(condition) {
	}
	
	while(condition) {
	}
	
	(function() {
	})();
	```

8. switch 下的 case 和 default 必须增加一个缩进层级。


	```js
	// good
	switch (variable) {
	
	    case '1':
	        // do...
	        break;
	
	    default:
	        // do...
	
	}
	
	// bad
	switch (variable) {
	
	case '1':
	    // do...
	    break;
	
	default:
	    // do...
	
	}
	```

-----------------------------------------------------
# 接下来的部分包含*[强制]*  必看，其余可选看!!!


## *[强制]* 空格
1. 在函数调用、函数声明、括号表达式、属性访问、if / for / while / switch / catch 等语句中，() 和 [] 内紧贴括号部分不允许有空格。函数部分，条件判断语句部分余参见上文（圆括号）
2. 单行声明的数组与对象，如果包含元素，{} 和 [] 内紧贴括号部分不允许包含空格。
	- 声明包含元素的数组与对象，只有当内部元素的形式较为简单时，才允许写在一行。元素复杂的情况，还是应该换行书写。

```js
// good
var arr1 = [];
var arr2 = [1, 2, 3];
var obj1 = {};
var obj2 = {name: 'obj'};
var obj3 = {
    name: 'obj',
    age: 20,
    sex: 1
};

// bad
var arr1 = [ ];
var arr2 = [ 1, 2, 3 ];
var obj1 = { };
var obj2 = { name: 'obj' };
var obj3 = {name: 'obj', age: 20, sex: 1};
```
	
3. 二元运算符两侧必须有一个空格，一元运算符与操作对象之间不允许有空格。

	```js
	var a = !arr.length;
	a++;
	a = b + c;
	```
4. *[强制]* 在对象创建时，属性中的 : 之后必须有空格，: 之前不允许有空格。
	
	```js
	// good
	var obj = {
	    a: 1,
	    b: 2,
	    c: 3
	};
	
	// bad
	var obj = {
	    a : 1,
	    b:2,
	    c :3
	};
	```
5. *[强制]* , 和 ; 前不允许有空格。
6. 行尾不得有多余的空格。

## 换行
1. 每个独立语句结束后必须换行。
2. 对于 if...else...、try...catch...finally 等语句，推荐使用在 } 号后添加一个换行 的风格，使代码层次结构更清晰，阅读性更好。
	
	```js
	if (condition) {
	    // some statements;
	}
	else {
	    // some statements;
	}
	
	try {
	    // some statements;
	}
	catch (ex) {
	    // some statements;
	}
	```
3. 运算符处换行时，运算符必须在新行的行首。

	```js
	// good
	if (user.isAuthenticated()
	    && user.isInRole('admin')
	    && user.hasAuthority('add-admin')
	    || user.hasAuthority('delete-admin')
	) {
	    // Code
	}
	
	var result = number1 + number2 + number3
	    + number4 + number5;
	
	
	// bad
	if (user.isAuthenticated() &&
	    user.isInRole('admin') &&
	    user.hasAuthority('add-admin') ||
	    user.hasAuthority('delete-admin')) {
	    // Code
	}
	
	var result = number1 + number2 + number3 +
	    number4 + number5;
	```    

4. 在函数声明、函数表达式、函数调用、对象创建、数组创建、for语句等场景中，不允许在 , 或 ; 前换行。

	```js
	// good
	var obj = {
	    a: 1,
	    b: 2,
	    c: 3
	};
	
	foo(
	    aVeryVeryLongArgument,
	    anotherVeryLongArgument,
	    callback
	);
	
	
	// bad
	var obj = {
	    a: 1
	    , b: 2
	    , c: 3
	};
	
	foo(
	    aVeryVeryLongArgument
	    , anotherVeryLongArgument
	    , callback
	);
	```
5. 不同行为或逻辑的语句集，使用空行隔开，更易阅读。
	
	```js
	// 仅为按逻辑换行的示例，不代表setStyle的最优实现
	function setStyle(element, property, value) {
	    if (element == null) {
	        return;
	    }
	
	    element.style[property] = value;
	}
	```
6. 每行不得超过 120 个字符。
	- 超长的不可分割的代码允许例外，比如复杂的正则表达式。长字符串不在例外之列。
	- 在语句的行长度超过 120 时，根据逻辑条件合理缩进。

	```js
	// 较复杂的逻辑条件组合，将每个条件独立一行，逻辑运算符放置在行首进行分隔，或将部分逻辑按逻辑组合进行分隔。
	// 建议最终将右括号 ) 与左大括号 { 放在独立一行，保证与 if 内语句块能容易视觉辨识。
	if (user.isAuthenticated()
	    && user.isInRole('admin')
	    && user.hasAuthority('add-admin')
	    || user.hasAuthority('delete-admin')
	) {
	    // Code
	}
	
	// 按一定长度截断字符串，并使用 + 运算符进行连接。
	// 分隔字符串尽量按语义进行，如不要在一个完整的名词中间断开。
	// 特别的，对于HTML片段的拼接，通过缩进，保持和HTML相同的结构。
	var html = '' // 此处用一个空字符串，以便整个HTML片段都在新行严格对齐
	    + '<article>'
	    +     '<h1>Title here</h1>'
	    +     '<p>This is a paragraph</p>'
	    +     '<footer>Complete</footer>'
	    + '</article>';
	
	// 也可使用数组来进行拼接，相对 + 更容易调整缩进。
	var html = [
	    '<article>',
	        '<h1>Title here</h1>',
	        '<p>This is a paragraph</p>',
	        '<footer>Complete</footer>',
	    '</article>'
	];
	html = html.join('');
	
	// 当参数过多时，将每个参数独立写在一行上，并将结束的右括号 ) 独立一行。
	// 所有参数必须增加一个缩进。
	foo(
	    aVeryVeryLongArgument,
	    anotherVeryLongArgument,
	    callback
	);
	
	// 也可以按逻辑对参数进行组合。
	// 最经典的是baidu.format函数，调用时将参数分为“模板”和“数据”两块
	baidu.format(
	    dateFormatTemplate,
	    year, month, date, hour, minute, second
	);
	
	// 当函数调用时，如果有一个或以上参数跨越多行，应当每一个参数独立一行。
	// 这通常出现在匿名函数或者对象初始化等作为参数时，如setTimeout函数等。
	setTimeout(
	    function () {
	        alert('hello');
	    },
	    200
	);
	
	order.data.read(
	    'id=' + me.model.id, 
	    function (data) {
	        me.attchToModel(data.result);
	        callback();
	    }, 
	    300
	);
	
	// 链式调用较长时采用缩进进行调整。
	$('#items')
	    .find('.selected')
	    .highlight()
	    .end();
	
	// 三元运算符由3部分组成，因此其换行应当根据每个部分的长度不同，形成不同的情况。
	var result = thisIsAVeryVeryLongCondition
	    ? resultA : resultB;
	
	var result = condition
	    ? thisIsAVeryVeryLongResult
	    : resultB;
	
	// 数组和对象初始化的混用，严格按照每个对象的 { 和结束 } 在独立一行的风格书写。
	var array = [
	    {
	        // ...
	    },
	    {
	        // ...
	    }
	];
	```

## 语句
1. 不得省略语句结束的分号。

2. 在 if / else / for / do / while 语句中，即使只有一行，也不得省略块 {...}。
	
	```js
	// good
	if (condition) {
	    callFunc();
	}
	
	// bad
	if (condition) callFunc();
	if (condition)
	    callFunc();
	```
3. 函数定义结束不允许添加分号。

	```js
	// good
	function funcName() {
	}
	
	// bad
	function funcName() {
	};
	
	// 如果是函数表达式，分号是不允许省略的。
	var funcName = function () {
	};
	```
	
4. IIFE 必须在函数表达式外添加` ( , !`，非 IIFE 不得在函数表达式外添加` ( , !`
	- IIFE = Immediately-Invoked Function Expression.

	- 额外的 ( 能够让代码在阅读的一开始就能判断函数是否立即被调用，进而明白接下来代码的用途。而不是一直拖到底部才恍然大悟。

	```js
	// good
	var task = (function () {
	   // Code
	   return result;
	})();
	
	var func = function () {
	};
	
	
	// bad
	var task = function () {
	    // Code
	    return result;
	}();
	
	var func = (function () {
	});
	```

## 循环
1. 不要在循环体中包含函数表达式，事先将函数提取到循环体外。
	- 循环体中的函数表达式，运行过程中会生成循环次数个函数对象。
2. 对循环内多次使用的不变值，在循环外用变量缓存。
3. 对有序集合进行遍历时，缓存 length。
	- 虽然现代浏览器都对数组长度进行了缓存，但对于一些宿主对象和老旧浏览器的数组对象，在每次 length 访问时会动态计算元素个数，此时缓存 length 能有效提高程序性能。
4. 对有序集合进行顺序无关的遍历时，使用逆序遍历(——逆序遍历可以节省变量，代码比较优化。)。

	```js
	var len = elements.length;
	while (len--) {
	    var element = elements[len];
	    // ......
	}
	```

5. <a name="forIn">For in循环</a>只用于遍历object/map/hash，for in 不要用在遍历array上，同时建议在使用时配合使用hasOwnProperty方法，过滤掉原型上面的属性

	```js
	for (var key in source) {
	    if (source.hasOwnProperty(key)) {
	        var item = {...};
	        list.push(item);
	    }
	}
	```    

## 类型
1. 类型检测
	- 类型检测优先使用 typeof。对象类型检测使用 instanceof。null 或 undefined 的检测使用 == null。

	```js
	// string
	typeof variable === 'string'
	
	// number
	typeof variable === 'number'
	
	// boolean
	typeof variable === 'boolean'
	
	// Function
	typeof variable === 'function'
	
	// Object
	typeof variable === 'object'
	
	// RegExp
	variable instanceof RegExp
	
	// Array
	variable instanceof Array
	
	// null
	variable === null
	
	// null or undefined
	variable == null
	
	// undefined
	typeof variable === 'undefined'
	```

2. 类型转换
	- 转换成 string 时，使用 + ''。
	- 转换成 number 时，通常使用 +。
	- string 转换成 number，要转换的字符串结尾包含非数字并期望忽略时，使用 parseInt。
	- 使用 parseInt 时，必须指定进制。

	```js
	var width = '200px';
	parseInt(width, 10);
	```
	- number 去除小数点，使用 Math.floor / Math.round / Math.ceil，不使用 parseInt
	- 转换成 boolean 时，使用 !!。


## 字符串
1. 字符串开头和结束使用单引号 '。
	- 输入单引号不需要按住 shift，方便输入。
	- 实际使用中，字符串经常用来拼接 HTML。为方便 HTML 中包含双引号而不需要转义写法。 `var html = '<div class="cls">拼接HTML可以省去双引号转义</div>';`
2. 使用 数组 或 + 拼接字符串。
	- 使用 + 拼接字符串，如果拼接的全部是 StringLiteral，压缩工具可以对其进行自动合并的优化。所以，静态字符串建议使用 + 拼接。
	- 在现代浏览器下，使用 + 拼接字符串，性能较数组的方式要高。
	- 如需要兼顾老旧浏览器，应尽量使用数组拼接字符串。

	```js
	// 使用数组拼接字符串
	var str = [
	    // 推荐换行开始并缩进开始第一个字符串, 对齐代码, 方便阅读.
	    '<ul>',
	        '<li>第一项</li>',
	        '<li>第二项</li>',
	    '</ul>'
	].join('');
	
	// 使用 + 拼接字符串
	var str2 = '' // 建议第一个为空字符串, 第二个换行开始并缩进开始, 对齐代码, 方便阅读
	    + '<ul>',
	    +    '<li>第一项</li>',
	    +    '<li>第二项</li>',
	    + '</ul>';
	```

## 对象
1. 使用对象字面量 {} 创建新 Object。
2. 对象创建时，一个对象的所有 属性 统一，要么全部添加引号或者全部不添加引号；
	- 如果一个对象的所有 属性 均可以不添加引号，则所有 属性 不得添加引号。
	- 对象创建时，如果任何一个 属性 需要添加引号，则所有 属性 必须添加 '。
3. 不允许修改和扩展任何原生对象和宿主对象的原型。
4. 属性访问时，尽量使用 .。
	- 属性名符合 Identifier 的要求，就可以通过 . 来访问，否则就只能通过 [expr] 方式访问。
	- 通常在 JavaScript 中声明的对象，属性命名是使用 Camel 命名法，用 . 来访问更清晰简洁。部分特殊的属性(比如来自后端的JSON)，可能采用不寻常的命名方式，可以通过 [expr] 方式访问。
	
	```js
	info.age;
	info['more-info'];
	```
5. for in 遍历对象时, 使用 hasOwnProperty 过滤掉原型中的属性。[见for in循环](#forIn)


## 数组
1. 使用数组字面量 [] 创建新数组，除非想要创建的是指定长度的数组。
2. *[强制]* 遍历数组不使用 for in。
	- 数组对象可能存在数字以外的属性, 这种情况下 for in 不会得到正确结果.

	```js
	var arr = ['a', 'b', 'c'];
	arr.other = 'other things'; // 这里仅作演示, 实际中应使用Object类型
	
	// 正确的遍历方式
	for (var i = 0, len = arr.length; i < len; i++) {
	    console.log(i);
	}
	
	// 错误的遍历方式
	for (i in arr) {
	    console.log(i);
	}
	```
3. 清空数组使用 .length = 0。

## 函数
1. 一个函数的长度控制在 50 行以内。
	- 将过多的逻辑单元混在一个大函数中，易导致难以维护。一个清晰易懂的函数应该完成单一的逻辑单元。复杂的操作应进一步抽取，通过函数的调用来体现流程。
	- 特定算法等不可分割的逻辑允许例外。

	```js
	function syncViewStateOnUserAction() {
	    if (x.checked) {
	        y.checked = true;
	        z.value = '';
	    }
	    else {
	        y.checked = false;
	    }
	
	    if (!a.value) {
	        warning.innerText = 'Please enter it';
	        submitButton.disabled = true;
	    }
	    else {
	        warning.innerText = '';
	        submitButton.disabled = false;
	    }
	}
	
	// 直接阅读该函数会难以明确其主线逻辑，因此下方是一种更合理的表达方式：
	
	function syncViewStateOnUserAction() {
	    syncXStateToView();
	    checkAAvailability();
	}
	
	function syncXStateToView() {
	    if (x.checked) {
	        y.checked = true;
	        z.value = '';
	    }
	    else {
	        y.checked = false;
	    }
	}
	
	function checkAAvailability() {
	    if (!a.value) {
	        displayWarningForAMissing();
	    }
	    else {
	        clearWarnignForA();
	    }
	}
	```
2. 一个函数的参数控制在 6 个以内。
	- 除去不定长参数以外，函数具备不同逻辑意义的参数建议控制在 6 个以内，过多参数会导致维护难度增大。
	- 某些情况下，如使用 AMD Loader 的 require 加载多个模块时，其 callback 可能会存在较多参数，因此对函数参数的个数不做强制限制。

3. 通过 options 参数传递非数据输入型参数。
	- 有些函数的参数并不是作为算法的输入，而是对算法的某些分支条件判断之用，此类参数建议通过一个 options 参数传递。
	- 1, boolean 型的配置项具备名称，从调用的代码上更易理解其表达的逻辑意义。
	- 2, 当配置项有增长时，无需无休止地增加参数个数，不会出现 removeElement(element, true, false, false, 3) 这样难以理解的调用代码。
	- 3, 当部分配置参数可选时，多个参数的形式非常难处理重载逻辑，而使用一个 options 对象只需判断属性是否存在，实现得以简化。

	```js
	/**
	 * 移除某个元素
	 *
	 * @param {Node} element 需要移除的元素
	 * @param {Object} options 相关的逻辑配置
	 * @param {boolean} options.removeEventListeners 是否同时将所有注册在元素上的事件移除
	 */
	function removeElement(element, options) {
	    element.parent.removeChild(element);
	    if (options.removeEventListeners) {
	        element.clearEventListeners();
	    }
	}
	```




## 参考：
1. [google JS 编码规范](http://alloyteam.github.io/JX/doc/specification/google-javascript.xml)
2. https://github.com/fex-team/styleguide/blob/master/javascript.md#249-%E4%BA%8B%E4%BB%B6%E6%B3%A8%E9%87%8A