# import && export


## 基本用法
1. 

## 使用

1、 使用

```js
// import 引入文件 
import aa from './aa';   // 引入 default
import {aa} from './aa'; // 包括 default
import * as aa from './aa';  // 包括 default 在内
import aa, * as aa2 from './aa'; // 包括 default
import aa, {aa} from './aa';

// import 导出文件
export {aa} from './aa';  // 引入的同时导出，但引入的内容在同一文件内无法使用
export {aa}; // export aa必须为简单类型，或者对象！
export default aa;  // 导出的值为 default 的值，aa 具体类型不限


```


## 注意点



