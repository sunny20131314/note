
# how: API & 使用案例
[TOC]

## memo => pureComponent
优化，建议都包一层，当props未更改时，不会重新渲染

对于 context, 是组件帮忙做了自动添加 props，不用自己多层透传，维护


## useState
setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

- 函数式更新
  - 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。
```js 
setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...updatedValues};
});
```

- 惰性初始 state 
  - 只在初始化时值被真正用上了，
  - 避免组件render时，每次都被执行
    - 该函数当且仅当初始化时被调用，从而优化性能。
    - `useState(expensivefn)` --> `useState(() => expensivefn())`
- 跳过 state 更新
调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（React 使用 Object.is 比较算法 来比较 state。）

需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。


### 适用场景
- 不依赖于其他值时，通过回调更改， setState(v => v + 1)
- 当依赖其他state值时， => useReducer
- 当依赖其他值时，可能需要useRef... (useEffect中)


### [受控与非受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

- 通常指值是否由React 体系来控制
  - 指代表单的 inputs
- 值是否受外部（父级）控制
  - 受控：用 props 传入数据
    - 组件被父级传入的 props 控制
  - 非受控：数据只保存在组件内部的 state 的话，是
    - 父级没办法直接控制 state


数据只保存在组件内部的 state 的话，是`非受控`组件（因为外部没办法直接控制 state）

默认不会更新，因为 useState 参数代表的是初始值，仅在 useSomething 初始时赋值给了 count state。后续 count 的状态将与 inputCount 无关。
这种外部无法直接控制 state 的方式，我们称为`非受控`。

```js
useSomething = (inputCount) => {
    const [ count, setCount ] = useState(inputCount);
};
```

### [派生 state](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

是： 一个组件的state中的某个数据来自外部


props 变化时更新 state
生命周期函数 componentWillReceiveProps 是响应 Props 变化之后进行更新的唯一方式。

16.3 版本里, 我们介绍了一个替代版的生命周期函数： getDerivedStateFromProps ，尝试用一个更安全的方式达到同样的目的

getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。


场景: 多用户登录框
当用户切换时:

#### 造成的隐形bug
[反例模式 demo](http://localhost:3000/hooks/StatePropsConflict/2/error)
[官网 demo](https://codesandbox.io/s/m3w9zn1z8x?file=/index.js)
##### 直接复制 props 到 state 上；
- 如果父组件更新， 那么我们输入的所有东西都会丢失；即使在重置 state 前比较 nextProps.email !== this.state.email 仍然会导致更新。
- ```js
  // note: 在组件接收到新的参数时被触发. 当父组件导致子组件更新的时候, 即使接收的 props 并没有变化, 这个函数也会被调用. 
  componentWillReceiveProps(nextProps) {
    // 这会覆盖所有组件内的 state 更新！
    // 不要这样做。
    this.setState({ email: nextProps.email });
  }

  const [email, setEmail] = useState();
  useEffect(() => {
    setEmail(props.email);
  }, [props.email]);
  ```  

- 解决：考虑缓存计算值： useMemo

####  如果 props 和 state 不一致就更新 state。
[官网demo](https://codesandbox.io/s/mz2lnkjkrx?file=/index.js)
- 只要props没有更改，就不会更新state；
- ```js
    componentWillReceiveProps(nextProps) {
      // 只要 props.email 改变，就改变 state
      if (nextProps.email !== this.props.email) {
        this.setState({
          email: nextProps.email
        });
      }
    }

    const [email, setEmail] = useState();
    useEffect(() => {
      if (prevProps.email !== props.email) {
        setEmail(props.email);
      }
    }, [props.email]);
  ```  
- 这种情况下，是否需要 state

#### 解决
任何数据，都要保证只有一个数据来源，而且避免直接复制它。

##### 受控组件：完全可控，由父组件控制
从组件里删除 state。如果 prop 里包含了 email，我们就没必要担心它和 state 冲突。

##### 非受控组件
- 添加key，重置内部所有的初始 state
  - 利用key变化时，会创建一个新的组件
  - 初始值由 props 的某个属性值控制，后续由 useState 维护后续更改
  - 大部分情况下，这是处理 ==重置 state 的最好办法==。
  - ```javascript
      class EmailInput extends Component {
        state = { email: this.props.defaultEmail };

        handleChange = event => {
          this.setState({ email: event.target.value });
        };

        render() {
          return <input onChange={this.handleChange} value={this.state.email} />;
        }
      }

      function EmailInput(props) {
        const [email, setEmail] = useState(props.defaultEmail);

        const handleChange = event => {
          setEmail(event.target.value);
        };

        return <input onChange={handleChange} value={email} />;
      }

      // 使用，只要 userId 变化，就重新创建 EmailInput
      <EmailInput
        defaultEmail={this.props.user.email}
        key={this.props.userId}
      />
    ```
- 选项一：用 prop 的 ID 重置非受控组件
  - [子组件监听属性值变化 demo](http://localhost:3000/hooks/StatePropsConflict/2/ok)
  - 如果某些情况下 key 不起作用（可能是组件初始化的开销太大），一个麻烦但是可行的方案是在 getDerivedStateFromProps 观察 userID 的变化，更改时调用setStatus（state中保存上一次的props）
  - ```javascript
      class EmailInput extends Component {
        state = { 
          email: this.props.defaultEmail,
          prevPropsUserID: this.props.userID
        };

        // note: 每次组件渲染前被调用，这意味着无论是父组件的更新, props 的变化, 或是组件内部执行了 setState(), 它都会被调用.
        // return an object to update the state, or null to update nothing.
        static getDerivedStateFromProps(nextProps, currentState) {
          // 只要当前 user 变化，
          // 重置所有跟 user 相关的状态。
          // 这个例子中，只有 email 和 user 相关。
          if (nextProps.userID !== currentState.prevPropsUserID) {
            return {
              prevPropsUserID: nextProps.userID,
              email: nextProps.defaultEmail
            };
          }
          return null;
        }

        handleChange = event => {
          this.setState({ email: event.target.value });
        };

        render() {
          return <input onChange={this.handleChange} value={this.state.email} />;
        }
      }

      function EmailInput(props) {
        const [email, setEmail] = useState(props.defaultEmail);
        // 记录上一次生效的 userId
        const prevIdRef = useRef(props.userID);

        const handleChange = event => {
          setEmail(event.target.value);
        };

        // 监听所有变化
        useEffect(() => {
          if (props.userID !== prevIdRef.current) {
            setEmail(props.email);
            prevIdRef.current = props.userID;
          }
        }, [props])

        return <input onChange={handleChange} value={email} />;
      }

      // 使用，只要 userId 变化，就重新创建 EmailInput
      <EmailInput defaultEmail={this.props.user.email} /> 
    ```
- 选项二：使用实例方法重置非受控组件
  [子组件返回实例方法](http://localhost:3000/hooks/StatePropsConflict/3)
  - 更少见的情况是，即使没有合适的 key，我们也想重新创建组件。一种解决方案是给一个随机值或者递增的值当作 key，另外一种是用实例方法强制重置内部状态：
  - 通过ref 获取到子组件实例
    - ref 传给子组件，同时子组件内部暴露内部setStatus的方法

即：
1. key（某个属性 or 随机 or 递增的值）
2. 更新时判断 上一次的props 和 当前的props (getDerivedStateFromProps or useEffect， 仅更改某些字段，观察特殊属性的变化)
3. 子组件暴露实例方法
   
refs 在某些情况下很有用，比如这个。但通常我们建议谨慎使用。即使是做一个演示，这个命令式的方法也是非理想的，因为这会导致两次而不是一次渲染。

##### memoization

用于确保渲染中使用的昂贵值仅在输入发生变化时才会重新计算

[memoization](https://www.imooc.com/article/39395)


## useEffect
副作用（side effect）
- 数据提取、订阅、或手工改变DOM (来自React 组件的) 
- 会影响其他组件，并且在渲染过程中无法完成。
- 副作用函数还可以通过返回一个函数来指定如何“清除”副作用

### hooks dependencies

- 无: 每次都会触发, 根据变化而变化（只要函数render就会触发）
- []: 仅在初始化时
- [a]: a更改时 & 初始化时: note: 浅对比
  - React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候


```js
const [num, setNum] = useState(0)
useEffect(() => {
  const handler = setInterval(() => {
    console.log(num);
    setNum(num + 1);
  }, 1000);

  return () => {
    clearInterval(handler);
  };
}, [num]);

```

## useContext
获取上下文，不使用组件嵌套就可以订阅 React 的 Context。
类比在某个环境中：比如取外号、名著（张飞）等，不在这个环境中，不懂，只能猜测是个人名

- 避免向下传递回调: [在 context 中向下传递 dispatch]: 
- 通过 context 用 useReducer 往下传一个 dispatch 函数


### 适用场景
- 数据流动超过两层
  - 简单的useState传值麻烦
  - 使用redux、useReducer又比较重
  - 使用 useState + createContext + useContext 更简单简单
    - 可以忽略action（数据请求）和一些较复杂的业务逻辑的时候


[useContext demo](http://localhost:3000/hooks/useContext)
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




## useReducer
- 通过 reducer 来管理组件本地的复杂 state
  - 管理包含多个子值的 state 对象

### 适用场景

- 在某些场景下，useReducer 会比 useState 更适用，例如：
  - state 逻辑较复杂且包含多个子值
  - 下一个 state 依赖于之前的 state 等。

- 深嵌套组件的性能优化，替代回调函数
  - 并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数。


当 useEffect 的依赖频繁变化，你可能想到把频繁变化的值用 ref 保存起来。
然而，useReducer 可能是更好的解决方式：使用 dispatch 消除对一些状态的依赖。

> React 会确保 setState/dispatch 函数的标识是==稳定的==，并且不会在组件重新渲染时发生变化。这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 setState/dispatch。 `deps中不需要传递 dispatch`
> 

### demo
[模拟列表滚动加载](http://localhost:3000/hooks/useReducer)

## useCallback
[UseCallback demo](http://localhost:3000/hooks/useCallback)

生成回调函数
只有当依赖值更改时，才重新生成回调函数
```js
// 除非 `a` 或 `b` 改变，否则memoizedCallback不会变
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## useMemo 缓存
当 deps 不变时，直接返回上一次计算的结果，从而使子组件跳过渲染（props未更改）。

目的：尽量使用缓存的值

### 思考
- 如果 deps 频繁变动，我们也要思考，使用 useMemo 有没有必要
- 如果 deps 为空数组，那么这个值在重新 render 时永远不会变，这种情况的目的？
  - 可以考虑移除函数式组件，或者通过useRef来处理

### 适应场景
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

## useRef
1. useCallback 读取一个经常变化的值 => 推荐 [在 context 中向下传递 dispatch]
2. 可参考，使用ref保留函数（不推荐）

### 适应场景
- 访问DOM节点
- 方便的保存变量
  - resolve闭包带来的问题

## useImperativeHandle 
可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);

// 在本例中，渲染 <FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。
```

## useLayoutEffect
其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。

可以使用它来读取 DOM 布局并同步触发重渲染。

在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

尽可能使用标准的 useEffect 以避免阻塞视觉更新。

## useDebugValue
useDebugValue(value)
useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签。

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}

// 我们不推荐你向每个自定义 Hook 添加 debug 值。当它作为共享库的一部分时才最有价值。
```