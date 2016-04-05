## 闭包及scope,

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

//如果没有保存变量,直接使用
/* let: 0-4 var: 5次5 */
for(let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  } ,100);
}
```

### 闭包深入: 闭包是函数代码和其[[scope]]的结合。
> 相关定义:
EC 执行上下文 Execution Contexts,
VO 变量对象(variable object),
AO 活动对象-函数上下文中的变量对象,
FD 函数声明 (FunctionDeclaration)

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


