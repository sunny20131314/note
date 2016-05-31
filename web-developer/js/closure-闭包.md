## 闭包及scope,


[TOC]


### 闭包概念
### 方式
### 三个特性:
### 三个好处
### 实践意义:
### 缺点:

## scope



### 闭包概念
> 闭包由两部分组成, 函数及创建该函数时的环境(环境指创建闭包时作用域内的任何局部变量).
闭包是一个概念,写局部函数时中就形成了闭包.

1, 闭包可以使作用域内访问到作用域外的变量和参数,这是因为形成了一条作用域链,
沿着作用域链去查找相应的变量.

2, 因为形成了作用域链, 在此基础上,要使作用域外访问到作用域内的变量, 就必须函数内部提供相应的接口.

### 方式
创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量

### 三个特性:
1, 函数嵌套函数

2, 可以访问自身作用域外的变量和参数.

3, 参数和变量不会被垃圾回收机制所引用

### 三个好处
1.希望一个变量长期驻扎在内存中(变量一直在被环境引用)

2.避免全局变量的污染

3.私有成员(方法或者变量及参数)的存在:
  - 1, 限制对代码的访问
  - 2, 还提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。


### 实践意义:
1,闭包允许将函数与其所操作的某些数据（环境）关连起来。
  - 这显然类似于面向对象编程。在面对象编程中，
  对象允许我们将某些数据（对象的属性）与一个或者多个方法相关联。

### 缺点:
 1, 要小心的使用闭包,避免多层闭包嵌套(变量).

 2, 因为闭包中引用的局部变量不会被垃圾回收机制回收,所以要小心内存泄露.
  变量不需要了,却认为这个对象还在被引用，因此在回收的时候不会释放它
   。导致了分配的这块内存永远也无法被释放出来。
   如果这样的情况越来越多，会导致内存不够用而系统崩溃。


``` js
function outerFn() {
  var count = 0; // count is a local variable created by outerFn
  function innerFn() { // innerFn() is the inner function, a closure
    console.log(count++); // innerFn() uses variable declared in the parent function
  }
  return innerFn;
}
// 变量count,因为内部函数innerFn 的调用而保存在环境中,不会被垃圾回收机制回收
var fn = outerFn(); // fn是一个闭包,由函数innerFn,和闭包创建时的局部变量count组成
fn(); // 0
fn(); // 1
```


``` js
//两个计数器是如何维护它们各自的独立性的。每次调用 makeCounter() 函数期间，其环境是不同的。
// 每次调用中， privateCounter 中含有不同的实例。
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
};

// Counter1, Counter2 保存着不同的环境,是两个独立的变量
var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /*  0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /*  2 */
Counter1.decrement();
console.log(Counter1.value()); /*  1 */
console.log(Counter2.value()); /*  0 */
```


## 使用 IIFE 避免 Lift 效应。
1. 在引用函数外部变量时，函数执行时外部变量的值由运行时决定而非定义时，最典型的场景如下：

以下代码函数的执行均会输出 4，往往不符合预期。

```js
//如果没有保存变量,直接使用，
/* let: 0-4 var: 5次5 */
for(let i = 0; i < 5; i++) {
  li[i].onclick = function() {
      console.log(i);
    };
}
```

此现象称为 Lift 效应 。解决的方式是通过额外加上一层闭包函数，将需要的外部变量作为参数传递来解除变量的绑定关系（如下）

``` js
//num中保存着变量i(局部)
var li = document.getElementsByTagName('li');
//i被闭包引用，内存不能被销毁
//onclick函数会查找i的值（作用域链是引用方式）
//这时候把i当参数传入，函数立即执行，num保存每次i的值。
for(let i = 0; i < li.length; i++) {
  ~function(num) {
    li[i].onclick = function() {
      console.log(num);
    };
  }(i); // 函数传入参数i,i保存在参数num中,而不是直接调用变量i
}
```
## 闭包：在适当的时候将闭包内大对象置为 null。
1. 在 JavaScript 中，无需特别的关键词就可以使用闭包，一个函数可以任意访问在其定义的作用域外的变量。需要注意的是，函数的作用域是静态的，即在定义时决定，与调用的时机和方式没有任何关系。

2. 闭包会阻止一些变量的垃圾回收，对于较老旧的JavaScript引擎，可能导致外部所有变量均无法回收。

3. 首先一个较为明确的结论是，以下内容会影响到闭包内变量的回收：
	- 嵌套的函数中是否有使用该变量。
	- 嵌套的函数中是否有 直接调用eval。
	- 是否使用了 with 表达式。

4. Chakra、V8 和 SpiderMonkey 将受以上因素的影响，表现出不尽相同又较为相似的回收策略，而JScript.dll和Carakan则完全没有这方面的优化，会完整保留整个 LexicalEnvironment 中的所有变量绑定，造成一定的内存消耗。

5. 由于对闭包内变量有回收优化策略的 Chakra、V8 和 SpiderMonkey 引擎的行为较为相似，因此可以总结如下，当返回一个函数 fn 时：
	- 如果 fn 的 [[Scope]] 是ObjectEnvironment（with 表达式生成 ObjectEnvironment，函数和 catch 表达式生成 DeclarativeEnvironment），则：
		- 如果是 V8 引擎，则退出全过程。
		- 如果是 SpiderMonkey，则处理该 ObjectEnvironment 的外层 LexicalEnvironment。
	- 获取当前 LexicalEnvironment 下的所有类型为 Function 的对象，对于每一个 Function 对象，分析其 FunctionBody：
		- 如果 FunctionBody 中含有 直接调用eval，则退出全过程。
否则得到所有的 Identifier。
		- 对于每一个 Identifier，设其为 name，根据查找变量引用的规则，从 LexicalEnvironment 中找出名称为 name 的绑定 binding。
		- 对 binding 添加 notSwap 属性，其值为 true。
	- 检查当前 LexicalEnvironment 中的每一个变量绑定，如果该绑定有 notSwap 属性且值为 true，则：
		- 如果是V8引擎，删除该绑定。
		- 如果是SpiderMonkey，将该绑定的值设为 undefined，将删除 notSwap 属性。
		- 对于Chakra引擎，暂无法得知是按 V8 的模式还是按 SpiderMonkey 的模式进行。

6. 如果有 非常庞大 的对象，且预计会在 老旧的引擎 中执行，则使用闭包时，注意将闭包不需要的对象置为空引用。




### 闭包深入: 闭包是函数代码和其[[scope]]的结合。
> 相关定义:
EC 执行上下文---函数的执行环境 Execution Contexts,
VO 变量对象(variable object),
AO 活动对象-函数上下文中的变量对象,
FD 函数声明 (FunctionDeclaration)
作用域(scope)、
作用域链(scope chain)
 以函数a从定义到执行的过程为例阐述这几个概念。

  1、当定义函数a的时候，js解释器会将函数a的作用域链(scope chain)设置为定义a时a所在的“环境”，如果a是一个全局函数，则scope chain中只有window对象。

  2、当函数a执行的时候，a会进入相应的执行环境(excution context)。

  3、在创建执行环境的过程中，首先会为a添加一个scope属性，即a的作用域，其值就为第1步中的scope chain。即a.scope=a的作用域链。

  4、然后执行环境会创建一个活动对象(Active object)。活动对象也是一个拥有属性的对象，但它不具有原型而且不能通过JavaScript代码直接访问。创建完活动对象后，把活动对象添加到a的作用域链的最顶端。此时a的作用域链包含了两个对象：a的活动对象和window对象。

  5、下一步是在活动对象上添加一个arguments属性，它保存着调用函数a时所传递的参数。

  6、最后把所有函数a的形参和内部的函数b的引用也添加到a的活动对象上。在这一步中，完成了函数b的的定义，因此如同第3步，函数b的作用域链被设置为b所被定义的环境，即a的作用域。

  到此，整个函数a从定义到执行的步骤就完成了。此时a返回函数b的引用给c，又函数b的作用域链包含了对函数a的活动对象的引用，也就是说b可以访问到a中定义的所有变量和函数。函数b被c引用，函数b又依赖函数a，因此函数a在返回后不会被GC回收。

  当函数b执行的时候亦会像以上步骤一样。因此，执行时b的作用域链包含了3个对象：b的活动对象、a的活动对象和window对象，如下图所示：

  如图所示，当在函数b中访问一个变量的时候，搜索顺序是先搜索自身的活动对象，如果存在则返回，如果不存在将继续搜索函数a的活动对象，依 次查找，直到找到为止。如果整个作用域链上都无法找到，则返回undefined。如果函数b存在prototype原型对象，则在查找完自身的活动对象 后先查找自身的原型对象，再继续查找。这就是Javascript中的变量查找机制。



#### EC定义:
 1, ECStack = [], 可以定义执行上下文堆栈是一个数组：

 2, 活动的 执行上下文(简称-EC) Execution Contexts 组在逻辑上组成一个堆栈。

 3, 堆栈底部永远都是全局上下文(global context)，而顶部就是当前(活动的)执行上下文。

 4, 堆栈在EC类型进入和退出上下文的时候被修改（推入或弹出）。

#### VO
 1,  VO = {};VO 变量对象(variable object)。数据存放的位置,以及读取的方法

 2, 变量对象(缩写为VO)是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的以下内容：
  - 1, 变量 (var, 变量声明);
  - 2, 函数声明 (FunctionDeclaration, 缩写为FD);不包括函数表达式
  - 3, 函数的形参(传进来的变量 formal parameters ,arguments)

 3, VO就是执行上下文的属性(property)：
  -  activeExecutionContext = {
      VO: {上下文数据（var, FD, function arguments)},
      this: thisValue  **** this与上下文中可执行代码的类型有直接关系，
                - this: 和属性[[scope]]有很大的关联,this指向依赖于scope才能真正确定,或者说,是内在机制
                - this值在进入上下文时确定，并且在上下文运行期间永久不变。
     };

 > ^^^^ 注意: 全局上下文中的变量对象: VO(globalContext) === global;
  1, 全局对象(Global object) 是在进入任何执行上下文之前就已经创建了的对象；
  2, 这个对象只存在一份，它的属性在程序中任何地方都可以访问，全局对象的生命周期终止于程序退出那一刻。
  3, 只有全局上下文的变量对象允许通过VO的属性名称来间接访问(因为在全局上下文里，全局对象自身就是变量对象)
   -- 不理解如何访问VO属性名


#### AO
 1, 函数上下文中的变量对象: VO(functionContext) === AO;

 2, 在函数执行上下文中，VO是不能直接访问的，此时由活动对象(activation object,缩写为AO)扮演VO的角色。

> 作用域链包含活动对象（ AO 包括传入的参数，函数内声明的参数等等，在作用域链数组的第一的位置）+ 作用域链（scope），
 然后有 scope=AO+scope，即是 函数作用域链=函数活动对象+父级函数作用域链
 右边的[[Scope]]这个表示为一个属性，该属性代表所有的父级及父级的所有上级的作用域组成的作用域链。



## scope
1, 作用域链之所以可以起作用,是因为函数上下文的作用域链是在函数调用时创建的，
  包含活动对象和这个函数内部的[[scope]]属性

2, [[scope]]在函数创建时被存储－－静态（不变的），永远永远，直至函数销毁。

3, 即：函数可以永不调用，但[[scope]]属性已经写入，并存储在函数对象中。

4, 与作用域链对比，[[scope]]是函数的一个属性而不是上下文。




### [this](http://javascript.ruanyifeng.com/oop/basic.html#toc6)
this就是指当前对象，或者说，指函数当前的运行环境。
在JavaScript语言之中，所有函数都是在某个运行环境之中运行，this就是这个环境。
对于JavaScipt语言来说，一切皆对象，运行环境也是对象，
所以可以理解成，所有函数总是在某个对象之中运行，this就指向这个对象。

所谓“运行环境”就是对象，this指函数运行时所在的那个对象。
如果一个函数在全局环境中运行，this就是指顶层对象（浏览器中为window对象）；
如果一个函数作为某个对象的方法运行，this就是指那个对象。








## 参考文章：

1. https://segmentfault.com/a/1190000000652891
