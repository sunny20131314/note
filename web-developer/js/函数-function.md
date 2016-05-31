
# 函数

1. js 里函数调用有 4 种模式：
	- 方法调用、正常函数调用、构造器函数调用、apply/call 调用。
	- 同时，无论哪种函数调用除了你声明时定义的形参外，还会自动添加 2 个形参，分别是 this 和 arguments。

2. 改变this指向
	
	- apply 函数接收 2 个参数，第一个是传递给这个函数用来绑定 this 的值，第二个是一个参数`数组`。
	- call() ，它的第一个参数也是绑定给 this 的值，但是后面接受的是不定参数，而不再是一个数组，也就是说你可以像平时给函数传参那样把这些参数一个一个传递。
		- 如果apply & call第一个参数传递 null，那么在函数 a 里面 this 指针依然会绑定全局对象 window。
		- 立马就调用了对应的函数。
	
	```js
	function a(xx, yy) {    
	    console.log(xx, yy);    
	    console.log(this);    
	    console.log(arguments);
	}
	
	var o = {};
	a.apply(o, [5, 55]); 
	a.call(o, 5, 55);
	// 5 55
	// Object {}
	// [5, 55]
	
	a.apply(null, [5, 55]);
	a.call(null, 5, 55);
	// 5 55
	// Window {…}
	// [5, 55]
	
	```

	- bind() 会生成一个新的函数，bind() 函数的参数跟 `call() `一致，第一个参数也是绑定 this 的值，后面接受传递给函数的不定参数。 bind() 生成的新函数返回后，你想什么时候调就什么时候调

	```js
	var m = {   
	    x : 1
	};
	function foo(y) {
	    alert(this.x + y);
	}
	foo.apply(m, [5]);  // 6
	foo.call(m, 5);
	
	var foo1 = foo.bind(m, 5);
	foo1();    // 6
	```



## 参考
1. http://rangercyh.blog.51cto.com/1444712/1615809
