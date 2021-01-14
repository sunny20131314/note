# Set


## 基本用法
1. 类似数组，但成员的值是唯一的。
2. Set 本身是个构造函数，用来生成 Set 数据结构。
3. Set 函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。
4. Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
5. 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set内部判断两个值是否不同，使用的算法叫做“Same-value equality”（NaN === NaN），它类似于精确相等运算符（===）（NaN !== NaN），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。



## 使用
1、 去除数组的重复成员
```js
// 方法1
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
// [3, 5, 2]


// 方法2
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```


## 注意点
> 1. 认为 NaN 等于 NaN. 除外类似于=== 的判断（NaN === NaN false） 

```js
var items = new Set([1, NaN, NaN]);
// [1, NaN]


let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```
上面代码向Set实例添加了两个NaN，但是只能加入一个。这表明，在Set内部，两个NaN是相等。




