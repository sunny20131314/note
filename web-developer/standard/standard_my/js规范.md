##前端规范——JS部分（补充部分）

## 注释
1. 单行注释： 
	- 必须独占一行。// 后跟一个空格，缩进与下一行被注释说明的代码一致。

2. 多行注释
	- 避免使用 /*...*/ 这样的多行注释。有多行注释内容时，使用多个单行注释。

3. 文档化注释
	- 为了便于代码阅读和自文档化，以下内容必须包含以 /**...*/ 形式的块注释中。
		- 文件
		- namespace
		- 类
		- 函数或方法
		- 类属性
		- 事件
		- 全局变量
		- 常量
		- AMD 模块
	- 文档注释前必须空一行。
	- 自文档化的文档说明 what，而不是 how。

4. 文件注释
	- 文件顶部必须包含文件注释，用 @file 标识文件说明。
	- 文件注释中可以用 @author 标识开发者信息。
	
	> 开发者信息能够体现开发人员对文件的贡献，并且能够让遇到问题或希望了解相关信息的人找到维护人。通常情况文件在被创建时标识的是创建者。随着项目的进展，越来越多的人加入，参与这个文件的开发，新的作者应该被加入 @author 标识。
	
	>@author 标识具有多人时，原则是按照 责任 进行排序。通常的说就是如果有问题，就是找第一个人应该比找第二个人有效。比如文件的创建者由于各种原因，模块移交给了其他人或其他团队，后来因为新增需求，其他人在新增代码时，添加 @author 标识应该把自己的名字添加在创建人的前面。
	
	>@author 中的名字不允许被删除。任何劳动成果都应该被尊重。

	> 业务项目中，一个文件可能被多人频繁修改，并且每个人的维护时间都可能不会很长，不建议为文件增加 @author 标识。通过版本控制系统追踪变更，按业务逻辑单元确定模块的维护责任人，通过文档与wiki跟踪和查询，是更好的责任管理方式。

	```js
	/**
	* @file Describe the file
	* @author author-name(mail-name@domain.com)
	*         author-name2(mail-name2@domain.com)
	*/
	``` 

5. 命名空间注释 命名空间使用 `@namespace`标识。
	
	```js
	/**
	 * @namespace
	 */
	var util = {};
	``` 
6. 类注释
	- 对于使用对象 constructor 属性来定义的构造函数，可以使用 @constructor 来标记。
	- 使用 @extends 标记类的继承信息。
	- 使用包装方式扩展类成员时， 必须通过 @lends 进行重新指向。
	- 没有 @lends 标记将无法为该类生成包含扩展类成员的文档。
		- 没有 @lends 标记将无法为该类生成包含扩展类成员的文档。
	- 类的属性或方法等成员信息使用 @public / @protected / @private 中的任意一个，指明可访问性。
		- 生成的文档中将有可访问性的标记，避免用户直接使用非 public 的属性或方法。 
	
	```js
	/**
	 * 描述
	 *
	 * @class
	 */
	function Developer() {
	    // constructor body
	}
	/**
	 * 类描述
	 *
	 * @class
	 * @extends Developer
	 */
	var Fronteer = function () {
	    Developer.call(this);
	
	    /**
	     * 属性描述
	     *
	     * @type {string}
	     * @private
	     */
	    this._level = 'T12';
	
	    // constructor body
	};
	
	util.extend(
	    Fronteer.prototype,
	    
	    /** @lends Fronteer.prototype */
	    {
	        _getLevel: function () {
	            // TODO
	        }
	    }
	);
	
	util.inherits(Fronteer, Developer);
	
	/**
	 * 方法描述
	 *
	 * @private
	 * @return {string} 返回值描述
	 */
	Fronteer.prototype._getLevel = function () {
	};
	``` 

7. 函数/方法注释
	- 函数/方法注释必须包含函数说明，有参数和返回值时必须使用注释标识。
	- 参数和返回值注释必须包含类型信息和说明。
	- 当函数是内部函数，外部不可访问时，可以使用 @inner 标识。
	
	```js
	/**
	 * 函数描述
	 *
	 * @param {string} p1 参数1的说明
	 * @param {string} p2 参数2的说明，比较长
	 *     那就换行了.
	 * @param {number=} p3 参数3的说明（可选）
	 * @return {Object} 返回值描述
	 */
	function foo(p1, p2, p3) {
	    var p3 = p3 || 10;
	    return {
	        p1: p1,
	        p2: p2,
	        p3: p3
	    };
	}
	```
	- 对 Object 中各项的描述， 必须使用 @param 标识。

	```js
	/**
	 * 函数描述
	 *
	 * @param {Object} option 参数描述
	 * @param {string} option.url option项描述
	 * @param {string=} option.method option项描述，可选参数
	 */
	function foo(option) {
	    // TODO
	}
	```
	- 重写父类方法时， 应当添加 @override 标识。如果重写的形参个数、类型、顺序和返回值类型均未发生变化，可省略 @param、@return，仅用 @override 标识，否则仍应作完整注释。
		- 简而言之，当子类重写的方法能直接套用父类的方法注释时可省略对参数与返回值的注释。	 
8. 事件注释
	- 必须使用 @event 标识事件，事件参数的标识与方法描述的参数标识相同（见下方例子说明）。
	- 在会广播事件的函数前使用 @fires 标识广播的事件，在广播事件代码前使用 @event 标识事件。
	- 对于事件对象的注释，使用 @param 标识，生成文档时可读性更好。

	```js
	/**
	 * 点击处理
	 *
	 * @fires Select#change
	 * @private
	 */
	Select.prototype.clickHandler = function () {
	    /**
	     * 值变更时触发
	     *
	     * @event Select#change
	     * @param {Object} e e描述
	     * @param {string} e.before before描述
	     * @param {string} e.after after描述
	     */
	    this.fire(
	        'change',
	        {
	            before: 'foo',
	            after: 'bar'
	        }
	    );
	};
	```

9. 常量注释
	- 常量必须使用 @const 标记，并包含说明和类型信息。

	```js
	/**
	 * 常量说明
	 *
	 * @const
	 * @type {string}
	 */
	var REQUEST_URL = 'myurl.do';
	```
10. AMD 模块注释
	- AMD 模块使用 @module 或 @exports 标识。
11. 细节注释 : 对于内部实现、不容易理解的逻辑说明、摘要信息等，我们可能需要编写细节注释。
	- 细节注释遵循单行注释的格式。说明必须换行时，每行是一个单行注释的起始。

	```js
	function foo(p1, p2, opt_p3) {
	    // 这里对具体内部逻辑进行说明
	    // 说明太长需要换行
	    for (...) {
	        ....
	    }
	}
	```
	- 有时我们会使用一些特殊标记进行说明。特殊标记必须使用单行注释的形式。下面列举了一些常用标记：
		- TODO: 有功能待实现。此时需要对将要实现的功能进行简单说明。
		- FIXME: 该处代码运行没问题，但可能由于时间赶或者其他原因，需要修正。此时需要对如何修正进行简单说明。
		- HACK: 为修正某些问题而写的不太好或者使用了某些诡异手段的代码。此时需要对思路或诡异手段进行描述。
		- XXX: 该处存在陷阱。此时需要对陷阱进行描述。


## js模块化
1. js文件按模块组织，采用requireJs模块加载器加载js文件



## 参考：
1. [google JS 编码规范](http://alloyteam.github.io/JX/doc/specification/google-javascript.xml)
2. https://github.com/fex-team/styleguide/blob/master/javascript.md#249-%E4%BA%8B%E4%BB%B6%E6%B3%A8%E9%87%8A