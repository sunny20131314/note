

## [hooks的体系设计之二状态粒度](https://zh-hans.reactjs.org/blog/2020/08/22/react-hooks-state-granularity.html)

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