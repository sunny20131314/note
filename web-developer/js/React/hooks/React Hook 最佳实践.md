# hooks
[TOC]


> 在调用 setState 后，React 将重新执行 render 函数，仅此而已。

## todo 
- [ ] immer
- [ ] hooks 源码实现
- [ ] 不明白为何会在调用setState后，会重新执行当前FC/C， 底层是怎么实现的，如何挂载上去的
- [ ] 总结学习一门技术的方法
- [ ] 代码维护过程中，如何评估代码好维护呢？
  - 逻辑理解性

## [React Hook 最佳实践](https://zh-hans.reactjs.org/blog/2020/05/22/react-hooks.html)

### hooks 使用顺序建议, 避免隐性bug
useEffect 对于函数依赖，尝试将该函数放置在 effect 内，或者使用 useCallback 包裹；

useEffect/useCallback/useMemo，对于 state 或者其他属性的依赖，根据 eslint 的提示填入 deps；

如果不直接使用 state，只是想修改 state，用 setState 的函数入参方式（setState(c => c + 1)）代替；

如果修改 state 的过程依赖了其他属性，尝试将 state 和属性聚合，改写成 useReducer 的形式。

当这些方法都不奏效，使用 ref，但是依然要谨慎操作。


### all hooks
#### memo => pureComponent

#### useMemo 缓存
当 deps 不变时，直接返回上一次计算的结果，从而使子组件跳过渲染（props未更改）。

目的：尽量使用缓存的值

##### 思考
- 如果 deps 频繁变动，我们也要思考，使用 useMemo 有没有必要
- 如果 deps 为空数组，那么这个值在重新 render 时永远不会变，这种情况的目的？
  - 可以考虑移除函数式组件，或者通过useRef来处理

##### 适应场景
- 依赖部分数据生成一个大数据
- 依赖部分数据生成组件，避免重渲染

```js
const data = useMemo(() => ({ id }), [id]);
// 当父组件 render 时，只要满足 id 不变，data 的值也不会发生变化，子组件也将避免 render
// return <Child data={data} />;


// 可以用 useCallback 代替
const fn = useMemo(() => () => {
    // do something
}, [a, b]);

const memoComponentsA = useMemo(() => (
    // 只有当 someProps 更改时， ComponentsA 才会重新渲染
    <ComponentsA {...someProps} />
), [someProps]);
```

#### useReducer
当 useEffect 的依赖频繁变化，你可能想到把频繁变化的值用 ref 保存起来。然而，useReducer 可能是更好的解决方式：使用 dispatch 消除对一些状态的依赖。


##### 适用场景
在某些场景下，useReducer 会比 useState 更适用，例如：

- state 逻辑较复杂且包含多个子值
- 下一个 state 依赖于之前的 state 等。

并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。

React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。`deps中不需要传递 dispatch`

#### useState 
基于 useReducer

##### [受控与非受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

组件可以被认为是`受控`（因为组件被父级传入的 props 控制）。

受控： 外部传入的 inputCount 属性发生了变化，使其与 useSomething Hook 内的 count state 不一致时，是否想要更新这个 count。


数据只保存在组件内部的 state 的话，是`非受控`组件（因为外部没办法直接控制 state）

默认不会更新，因为 useState 参数代表的是初始值，仅在 useSomething 初始时赋值给了 count state。后续 count 的状态将与 inputCount 无关。
这种外部无法直接控制 state 的方式，我们称为`非受控`。

```js
useSomething = (inputCount) => {
    const [ count, setCount ] = useState(inputCount);
};
```

##### 派生 state
 props 变化时更新 state
生命周期函数 componentWillReceiveProps 是响应 Props 变化之后进行更新的唯一方式。

16.3 版本里, 我们介绍了一个替代版的生命周期函数： getDerivedStateFromProps，尝试用一个更安全的方式达到同样的目的

getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。

###### 造成的隐形bug

- 直接复制 props 到 state 上；
  - 缓存计算值： useMemo
- 如果 props 和 state 不一致就更新 state。
  - 这种情况下，是否需要 state

  - 解决
    - 受控组件：完全可控，由父组件控制
    - 非受控组件
      - 建议：重置内部所有的初始 state, 添加key
        - key变化时，会创建一个新的组件
        - 初始值由 props 的某个属性值控制，后续由 useState 维护后续更改
      - 选项一：更改部分字段，用 prop 的 ID: 
        - getDerivedStateFromProps 内部判断 ID 变化，更改时调用setStatus
      - 选项二：更改部分字段，使用实例方法 
        - 通过ref 获取到组件实例
          - ref 传给子组件，子组件内部暴露内部setStatus的方法

##### 惰性初始化
虽然 initialState 只在初始化时有其存在的价值，但是 someExpensiveComputation 在每一帧都被调用了
```js
const [state0, setState0] = useState(someExpensiveComputation(props));
```

该函数当且仅当初始化时被调用，从而优化性能。
```js
const [state, setState] = useState(() => someExpensiveComputation(props));
```

###### 值更改
- 不依赖于其他值时，通过回调更改， setState(v => v + 1)
- 当依赖其他state值时， => useReducer
- 当依赖其他值时，可能需要useRef... (useEffect中)

#### useRef
1. useCallback 读取一个经常变化的值 => 推荐 [在 context 中向下传递 dispatch]
2. 可参考，使用ref保留函数（不推荐）


#### useCallBack 生成回调函数
只有当依赖值更改时，才重新生成回调函数
```js
// 除非 `a` 或 `b` 改变，否则memoizedCallback不会变
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

#### useContext 获取上下文

1. 避免向下传递回调: [在 context 中向下传递 dispatch]: 通过 context 用 useReducer 往下传一个 dispatch 函数
```js
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}

function DeepChild(props) {
  // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```

### 例子
- [滑动选择器](https://codesandbox.io/s/7-useslider-zuizhongban-forked-1si14?file=/src/Example.js)


## [hooks 体系设计之一分层](https://zh-hans.reactjs.org/blog/2020/08/21/react-hooks-extra-level-of-indirection.html)
金字塔形状，自底向上依次为：

### 分层

#### 最底层的内置 hook
不需要自己实现，官方直接提供。

#### 不可变更新 immer
简化状态更新方式的 hook，比较经典的是引入 immer。
使用 immer 进行更新，利用 Proxy 的特性将可变的数据更新映射为不可变的操作。

[immer 入门文档](https://segmentfault.com/a/1190000017270785)
##### 状态管理的基础 hook 是 useState 和 useReducer，因此我们能封装成： 

```js
import React from 'react';
import { Draft, Immer, setAutoFreeze, applyPatches } from 'immer';
setAutoFreeze(false);
const { produce } = new Immer({
  autoFreeze: false,
});

const useImmerState = initState => {
  const [state, setState] = React.useState(initState);
  
  // note: produce返回值，那么将会重置 state
  const updateState = args => {
    setState(
      typeof args === 'function'
        ? produce(args)
        : args
    ), []);
  };
  return [state, updateState];
};
const [state, setState] = useImmerState({foo: {bar: 1}});

setState(s => {
  s.foo.bar++
}); // 直接进行可变更新
setState({foo: {bar: 2}}); // 保留直接更新值的功能

```
```js
const useImmerReducer = (reducer, initState) => {
  const [state, dispatch] = React.useReducer(produce(reducer), initState);
  return [state, dispatch];
};
const [state, dispatch] = useImmerReducer(
    (state, action) => {
      switch (action.type) {
        case 'ADD':
          state.foo.num += action.payload;
          break;
        default:
          break;
      }
    },
    { foo: { num: 1 } }
  );

dispatch({ type: 'ADD', payload: 2 });
```
##### 状态与行为: 类
引入“状态 + 行为”的概念，通过声明状态结构与相应行为快速创建一个完整上下文。

可以看到，这样的声明非常接近面向对象的形态。有部分 React 的开发者在粗浅地了解函数式编程后，成了激进的“反面向对象党”，这显然是不可取的，面向对象依然是一种很好的`封装`和`职责边界划分`的形态，不一定要以其表面形态去实现，却也万万不可丢弃了其`内在理念`。

原
```js
const [age, SetAge] = useState(0);
const birthday = useCallback(
    () => {
        setAge(age => age + 1);
    },
    [age]
);
```

更改为
```js
const userMethods = {
    birthday(user) {
        user.age++; // 利用了immer的能力
    },
};

export const useMethods = (methodMap, initialState) => {
  const [state, setState] = useImmerState(initialState);

  const methods = Object.keys(methodMap).reduce((total, methodName) => {
    const methodfn = methodMap[methodName];
    // 透传属性值
    total[methodName] = (...args) => setState(s => methodfn(s, ...args));
    return total;
  }, {});
  console.log('useMethods -> methods', methods);
  return [state, methods, setState];
};
const [user, methods, setUser] = useMethods(
    userMethods,
    {name: '', age: 0}
);

methods.birthday();
```


#### 数据结构的抽象
对常见数据结构的操作进行封装，如数组的操作。

#### 针对通用业务场景进行封装，如分页的列表、滚动加载的列表、多选等。
场景的封装不应与组件库耦合，它应当是业务与组件之间的桥梁，不同的组件库使用相同的 hook 实现不同的界面，这才是一个理想的模式

#### 实际面向业务的实现。

### 参考
1. [react-hooks](https://github.com/ecomfe/react-hooks)
2. [ahooks](https://ahooks.js.org/zh-CN/hooks/state/use-previous)
3. [immer官方英文文档](https://immerjs.github.io/immer/docs/performance)
4. [immer 入门文档](https://segmentfault.com/a/1190000017270785)


## [React Hooks 的体系设计之二 - 状态粒度](https://zh-hans.reactjs.org/blog/2020/08/22/react-hooks-state-granularity.html)

组织和可读性

### 粒度过细
每个state维护一份 useState

> 做一个表格，带一个选中功能，其中一个点是“按住 SHIFT 的同时点击一行可以选中一个区域”。
- 记录当前选择项
- 按住 SHIFT 后记录选择的最后一项
then 把之间的全部设置为选中


扩展，如果选择项为全选，则设置为全不选


### 使用 reducer 管理状态更新

```js
const DEFAULT_SELECTION_STATE = {
    selection: [],
    lastSelected: 0,
};

const SelectableList = () => {
    const [selectionState, setSelectionState] = useState(DEFAULT_SELECTION_STATE);
    const selectLine = useCallback(
        index => {
            const updater = ({selection}) => {
                return {
                    selection: selection.concat(index),
                    lastSelected: index,
                };
            };
            setSelectionState(updater);
        },
        []
    );
};
```
Q: 
- 状态的更新与状态的声明距离过远
- 阅读者想搞清楚一个状态被如何使用、如何更新是非常困难的，这不仅降低代码的可维护性，还给代码的学习者很大的挫败感，久而久之的影响就是谁也不愿意接手这代码。

S: 
- 把状态和更新封装到自定义的 hook 中，比如就叫 useSelection。
  - hook 作为一种`解决方案` -> 过于重量级，input/output，+ts（o(╥﹏╥)o 工作量更大了）。
- 使用 useReducer 来实现。
  - 轻量级：状态声明 + 状态更新 放置在一起
- useMethods、useImmer （见hooks之分层）

### 状态过粗
多个state全放在 useState 中维护
- cc 中： hocs
- fc 中： hooks

Q:
复用性、精简降低

### 合理设计粒度


