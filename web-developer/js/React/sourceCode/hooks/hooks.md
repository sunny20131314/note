# hooks 源码
[TOC]

## useState useReducer

### Q
- React 如何管理区分Hooks？
- useState和useReducer如何在每次渲染时，返回最新的值？
- 为什么不能在条件语句中使用hooks

### mount
mountWorkInProgressHook 创建`Hooks链表`:，并把其挂在链表上

头指针： firstWorkInProgressHook
尾指针： workInProgressHook

### update
更新值：update阶段，也就是看一下我们的useState或useReducer是如何利用现有的信息，去给我们返回最新的最正确的值的

#### 循环链表： `queue链表`
  - 存放每次的更新（历史更新操作）
  - 每次我们调用dispatchAction方法的时候，就会形成一个新的updata对象，添加到queue链表上，而且这个是一个循环链表。

note: 每一个hook节点都有其 queue循环链表

queue 尾指针指向最后更新的那个值

```js
const [name, setName] = React.useState('hi');
```
name: memoizedState

#### Hooks链表
FiberNode.memoizedState 存放Hooks链表位置

### answer
- React 如何管理区分Hooks？
  - React通过`单链表`来管理Hooks
  - 按Hooks的`执行顺序`依次将Hook节点添加到链表中
    - 也就是 setState 调用的顺序会放置在其中，初始化并没有 hooks 节点哦

- useState和useReducer如何在每次渲染时，返回最新的值？
  - 每个Hook节点通过`循环链表`记住所有的更新操作 (`dispatchAction`)
  - 在update阶段会依次执行update循环链表中的所有更新操作，最终拿到最新的state返回 (`updateReducer`)

- 为什么只能在函数顶层使用Hooks而不能在条件语句等里面使用Hooks？
  - 链表
  - 位置无法一一对应 => 无法正确从hooks链表中获取信息，执行异常

- 链表位置
FiberNode

- why 链表？
  - 从前往后执行
  - 后面追加


## useEffect
useEffect做了什么？

- FiberNode节点中会有一个`updateQueue链表`（componentUpdateQueue在 (`renderWithHooks`) 中赋值到fiberNode的updateQueue上）来存放所有的本次渲染需要执行的effect。

- mountEffect阶段和updateEffect阶段会把effect 挂载到updateQueue上 (`pushEffect`)。
- updateEffect阶段，deps没有改变的effect会被打上NoHookEffect tag，commit阶段会跳过该Effect。
- commit阶段: 在组件渲染完毕之后，React就会执行updateQueue中的所有方法。 (`commitHookEffectList`)


## 源码中扩展
- 位操作符
  - a&b: 先把a、b转换为二进制数，再进行每位的`或转换`（只要有一个为true则为true）
  - a|b: 类似上，`与转换`（两个为true才为true）


## bug
- [ ] useEffect(async () => {}, []); 在unmount 阶段报错
  - async => return promise对象
  - async = promise + generator + iterator
```js
function commitHookEffectList(unmountTag,mountTag,finishedWork) {
  const updateQueue = finishedWork.updateQueue;
  let lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;
    do {
      if ((effect.tag & unmountTag) !== NoHookEffect) {
        // Unmount 阶段执行tag !== NoHookEffect的effect的清除函数 （如果有的话）
        const destroy = effect.destroy;
        effect.destroy = undefined;
        if (destroy !== undefined) {
          destroy();
        }
      }
      if ((effect.tag & mountTag) !== NoHookEffect) {
        // Mount 阶段执行所有tag !== NoHookEffect的effect.create，
        // 我们的清除函数（如果有）会被返回给destroy属性，一遍unmount执行
        const create = effect.create;
        effect.destroy = create();
      }
      effect = effect.next;
    } while (effect !== firstEffect);
  }
}
```


## hooks源码解读参考
- [工具：如何使用vscode 查看源码](https://juejin.im/post/6844903876026777607#heading-2)
  - 与chrome 区别？
- [React 源码解析 ---> 如何在自己的项目中运行自己编译的react](https://blog.csdn.net/qq_32281471/article/details/94968617?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.compare&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.compare)
  - 与上配合使用，方便自己修改react源码

- [🍼holyZhengs ---> 提供 hooks 总思路](https://juejin.cn/post/6844904080758800392#heading-10)

- [react源码学习一之ReactChildren.js & 源码断点调试 ---> 作者画了流程图](https://blog.csdn.net/royasongsong/article/details/106874428)
  - [剖析 React 源码 ---> 解析：createElement/ReactBaseClasses/Refs/ReactChildren](https://juejin.im/post/6844903829704540174)
    - 上面的读者参考此文
    - [作者KieSun 的 github](https://github.com/KieSun/react-interpretation)
    - [作者的博客](https://github.com/KieSun/Dream)
- [chrome调试工具使用之js篇](https://blog.csdn.net/userkang/article/details/85252644)

- [BUPTlhuanyu ---> 基于16.6 画了一张巨大无比的图，无hooks、Fiber调度](https://github.com/BUPTlhuanyu/ReactNote)    
  - 作者相当认真，用心了  

## React 解读参考
- [学习react精髓 ---> KieSun:](https://github.com/KieSun/learn-react-essence)
  - render
  - 组件更新：调度
  - 组件更新：diff
  - 调度原理
      

## lodash 源码
- [VS Code + webpack 调式 lodash 源码（如何用VS Code调式ES6代码）](https://segmentfault.com/a/1190000012621745)  
- [UnderScore源码看防抖和节流](https://juejin.im/post/6844903768962629639)