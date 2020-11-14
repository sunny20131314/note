# diff
[TOC]

[why need Virtual Dom? ---> KieSun: 作者写了博客，并自造轮子](https://github.com/KieSun/My-wheels/tree/master/Virtual%20Dom)

## todo
[virtual dom及diff算法](https://github.com/HolyZheng/holyZheng-blog/issues/14)

##  Q
- 节点：每个DOM节点，可以为div/span等真实节点，也可以为自定义组件，那么自定义组件如何计算挂载？

## 为什么需要 Virtual Dom
众所周知，操作 DOM 是很耗费性能的一件事情，既然如此，我们可以考虑通过 JS 对象来模拟 DOM 对象，毕竟操作 JS 对象比操作 DOM 省时的多。

当然在实际操作中，我们还需要给每个节点一个标识，作为判断是同一个节点的依据。所以这也是 Vue 和 React 中官方推荐列表里的节点使用唯一的 key 来保证性能。

那么既然 DOM 对象可以通过 JS 对象来模拟，反之也可以通过 JS 对象来渲染出对应的 DOM

以下是一个 JS 对象模拟 DOM 对象的简单实现

## Virtual Dom 算法
###  树的递归
需要判断三种情况: `diff` `dfs`
- 没有新的节点，那么什么都不用做
- 新的节点的 tagName 和 `key` 和旧的不同，就替换
- 新的节点的 tagName 和 key（可能都没有） 和旧的相同，开始遍历子树

###  判断属性的更改
`diffProps`
- 先遍历 oldProps 查看是否存在删除的属性
- 然后遍历 newProps 查看是否有属性值被修改
- 最后查看是否有属性新增

###  判断列表差异算法实现
`listDiff`
- 对树递归的优化: key, 和判断属性差异是类似
  遍历旧的节点列表，查看每个节点是否还存在于新的节点列表中
  遍历新的节点列表，判断是否有新的节点
  在第二步中同时判断节点是否有移动
- 思路:
  - 为了获取all节点变化信息，以及最终list顺序：
    - changes: 记录节点变化信息：remove & insert & move
      - remove: 在旧节点中存在，新节点中不存在
      - add: 与上相反： 在旧节点中不存在，新节点中存在
      - move: 新旧节点中的位置不相同，把旧节点的位置移到新节点的位置
    - list: 记录最终渲染出来的节点key顺序
      - note: 第二个for循环存在的原因
        - 可以正确获得被删除节点索引
      - 交换节点位置只需要操作一遍 DOM
      - 用于 `diffChildren` 函数中的判断，只需要遍历
- eg: 以下树节点的变化    
  旧DOM tree：
        A
    B1      B2
  C1 C2   C3 C4

  新DOM tree：删除 C2, C4 和 C3 互换位置, C5 插入到 1
        A
    B1      B2
  C1      C4 C5 C3

  - B1节点上: {type: 'remove', index: 1}  删除 C2

  - B2节点上: {type: 'move', from: 1, to: 0}   C4 和 C3 互换位置
  - B2节点上: {type: 'insert', node: c5, index: 1 } C5 插入到 1

###  遍历子元素打标识
`diffChildren`
- 判断两个列表差异
- 给节点打上标记


###  渲染差异
`patch`
- 深度遍历树，将需要做变更操作的取出来
- 局部更新 DOM


##  总结
Virtual Dom 算法的实现也就是以下三步

- 通过 JS 来模拟创建 DOM 对象
- 判断两个对象的差异
- 渲染差异