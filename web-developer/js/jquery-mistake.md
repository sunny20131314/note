## 记录jquery中经常混淆的点




1, 遍历

  1. parents,parent,closest傻傻分不清楚
    - parents: 是在当前元素上获取祖先节点直到document,是符合条件的集合 . >0
    - parent:  是在当前元素上获取`父节点`. 0/1
    - closest: 是获取当前元素上开始搜寻,找到符合条件 (matches the selector) 的最近的祖先元素及`自身`,
           .closest( arr, [,content]) .closest(selector).必须提供参数. 0/1
    - 区别:
       - $( "html" ).parent(); 返回 document.
       - $( "html" ).parents(); 返回 空集.
       - closest搜索集包括自身!!!
  2.



2, 使用map遍历数组时。

``` javascript
$.map( [ 0, 1, 2 ], function( n ) {
    return [ n, n + 1 ];
});
// [ 0, 1, 1, 2, 2, 3 ]而不是 [ [0, 1], [1, 2], [2, 3] ]

$.map( [ 0, 1, 2 ], function( n ) {
    return [[ n, n + 1 ]];
});
// 才是 [ [0, 1], [1, 2], [2, 3] ]
```