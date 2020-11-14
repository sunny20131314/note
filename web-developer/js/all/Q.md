# Set


## 基本用法
1. 类似数组，但成员的值是唯一的。
2. Set 本身是个构造函数，用来生成 Set 数据结构。


## 注意点
> 1. 认为 NaN 等于 NaN. 除外类似于=== 的判断（NaN === NaN false） 

```js
var items = new Set([1, NaN, NaN]);
// [1, NaN]
```



