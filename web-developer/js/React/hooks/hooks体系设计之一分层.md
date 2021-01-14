
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
