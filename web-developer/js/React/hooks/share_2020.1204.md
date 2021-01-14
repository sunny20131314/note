# react hooks 最佳实践
[TOC]

## wanan
1. 通过场景分析使用什么样的hooks
2. 遇到问题时，是怎么造成的，用哪个hooks及怎么用可以解决？

### 派生state
无子组件状态
key
子组件保留上一次生效的值（useRef）

### useEffect
在effect 中使用了函数，函数内部

### useCallback


## what
hooks 解决方案
- 无重大变化，没有破坏性改动，完全向后兼容
- 逐步采用的策略，可选，现在可用
  
在Hooks出现之前，函数组件只能是纯组件，无法满足私有状态以及副作用的场景。

Hooks出现之后，类组件可以做的事情，函数组件基本可以满足，甚至拥有更好的开发体验。


- 给函数式 React 组件注入状态的 React API

## why need hooks?
解决了什么问题？带来了什么影响

### 问题
- 难以在组件之间复用有状态逻辑
  - 包装器地狱
    - Provider、Consumer、hoc、render prop 和其他抽象组件形成的
      - 使用hoc, ref的问题 (forwardRef)
- 复杂的组件变得难以理解
  - 大量状态逻辑、副作用等
  - 生命周期
    - 同一生命周期内充斥着不相干逻辑
      - 订阅事件、发送请求
    - 关联逻辑被拆分在不同的生命周期
      - 注册、解绑
    - 状态、逻辑越来越多，容易导致不一致，随着代码量越来越大，bug😭...
  - 与状态管理库结合，需要在不同的文件之间来回切换，复用组件不便
    - redux, reducer...
- 难以理解的 class
  - this / 事件处理器 bind(=>)
  - class 不能很好的压缩

### 特点
- 共享状态逻辑
  - 提取
    - 抽象（表达）
  - 独立测试
  - 复用
    - 无需修改组件结构 -> 自定义组件
    - 社区 hooks
    - 减少代码实现；
- 更小粒度
  - 相互关联的部分，被拆分更小的函数，且非强制按照生命周期划分
    - 创建订阅及取消订阅
- 拥抱函数


### 解决的最大痛点
  - 拆小组件
    - 分治
  - 抽象（表达）
  - 复用
  - 组合
    - 共享逻辑，可以将逻辑解耦。

其他痛点：


### Hooks 最大的缺点：
闭包

函数的运行是独立的，每个函数都有一份独立的作用域。函数的变量是保存在运行时的作用域里面，当我们有异步操作的时候，经常会碰到异步回调的变量引用是之前的，也就是旧的（这里也可以理解成闭包）如下：

React Hooks 由于是函数式组件，在异步操作或者使用 useCallBack、useEffect、useMemo 等 API 时会形成闭包。



## Hook 的规则
Hook 是 JavaScript 函数，但强加了两个额外的规则：
- 只能在顶层调用 Hook，不要在循环、条件或嵌套函数中调用 Hook。
  - 实现原理，使用链表来维持顺序，当hooks不能一一对应时，会导致异常
  - 每一个 React Hooks API 都是匿名的，那这一次执行的 Hook 怎么跟上一次执行的 Hook 对应起来？
  - 关键点是顺序，Hooks 组件通过记录 Hooks 执行的顺序来和上一次的 Hook 一一对应的。

- 仅从 React 函数组件调用 Hook。
  - 不要从常规 JavaScript 函数调用 Hook。（还有另一个有效的地方来调用 Hook，即你的自定义 Hook。）
  - 这里（https://www.npmjs.com/package/eslint-plugin-react-hooks）提供了一个 linter 插件来自动执行这些规则，这些规则乍看起来有些令人疑惑，但它们对 Hook 的良好运行至关重要。


## [使用hooks 与先前的解决方案对比](http://localhost:3000/hooks/compair)
hoc & hooks



见 /Users/sunny/Documents/workspace/project/note/web-developer/todo/my-app/src/page/compair.jsx

## how: API & 使用案例


## 自定义hooks
组件之间重用一些状态逻辑：
目前为止，有几种主流方案来解决这个问题：
  - 高阶组件
  - render props。
  - 自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。

可以创建涵盖各种场景的自定义 Hook：
- 表单处理、动画、订阅声明、计时器

解耦状态相关逻辑



## 避坑指南
React在设计层面把大部分的优化责任都对给了开发者，使用React会有一定的心智负担。当我们使用Hooks的时候，这样的感受会更加强烈。但是总结起来 Hooks 的大部分问题其实都跟闭包或副作用依赖有关。


### hooks 使用顺序建议, 避免隐性bug
- useEffect
  - 函数依赖，
    - 将该函数放置在 effect 内
    - 放在组件外
    - 使用 useCallback 包裹；
- useEffect/useCallback/useMemo
  - 对于 state 或者其他属性的依赖，根据 eslint 的提示填入 deps；
- setState
  - 不依赖其他state
    - 用 setState 的函数入参方式（setState(c => c + 1)）代替；
  - 依赖了其他state，改写成 useReducer 的形式；
- 以上方法都不奏效，使用 useRef


## 体系设计
### [hooks 体系设计之一分层](https://zh-hans.reactjs.org/blog/2020/08/21/react-hooks-extra-level-of-indirection.html)

金字塔形状，自底向上依次为：
#### 最底层的内置 hook
不需要自己实现，官方直接提供。

#### 不可变更新 immer
简化状态更新方式的 hook，比较经典的是引入 immer。
使用 immer 进行更新，利用 Proxy 的特性将可变的数据更新映射为不可变的操作。

##### useImmerState / useImmerReducer

##### 状态与行为: 类 userMethods
引入“状态 + 行为”的概念，通过声明状态结构与相应行为快速创建一个完整上下文。

函数式编程、 
todo: 面向对象的内在理念是？
`封装`和`职责边界划分`的形态

#### 数据结构的抽象
对常见数据结构的操作进行封装，如数组的操作。

#### 针对通用业务场景进行封装，如分页的列表、滚动加载的列表、多选等。
场景的封装不应与组件库耦合，它应当是业务与组件之间的桥梁，不同的组件库使用相同的 hook 实现不同的界面，这才是一个理想的模式


#### 实际面向业务的实现


### [hooks的体系设计之二状态粒度](https://zh-hans.reactjs.org/blog/2020/08/22/react-hooks-state-granularity.html)

组织和可读性

#### 粒度过细
每个state维护一份 useState

> 做一个表格，带一个选中功能，其中一个点是“按住 SHIFT 的同时点击一行可以选中一个区域”。
- 记录当前选择项
- 按住 SHIFT 后记录选择的最后一项
then 把之间的全部设置为选中


扩展，如果选择项为全选，则设置为全不选

##### 使用 reducer 管理状态更新

#### 状态过粗
多个state全放在 useState 中维护
- cc 中： hocs
- fc 中： hooks

Q:
复用性、精简降低

#### 合理设计粒度


### 抽离公共 hooks
### hooks 踩坑分享
- 闭包，返回的函数为之前的，函数内不能拿到当前最新的props/state值
  ```js
  const [count, setCount] = useState(0);
  useEffect(()=> {console.log(count)}, []);
  ```

## 轮子
- [ahooks](https://ahooks.js.org/zh-CN)
- [react-use -> react hooks 的 lodash](https://github.com/streamich/react-use)
- [react-hooks](https://github.com/ecomfe/react-hooks)

- [玩转查询列表 useFormTableQuery](https://formilyjs.org/#/0yTeT0/zlcDcOsbhP)

## 参考
- [React Hooks踩坑分享](https://www.infoq.cn/article/yQEtdq5xUPPO1ZwghSVw?utm_source=related_read_bottom&utm_medium=article)