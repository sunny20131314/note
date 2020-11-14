# script: async / defer

1. `<script src="script.js"></script>`
	- 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

2. `<script async src="script.js"></script>`
	- 有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

3. `<script defer src="myscript.js"></script>`
	- 有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。


## 异同：
1. 同：
	- defer 和 async 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）

2. 异： 
	- 它俩的差别在于脚本下载完之后何时执行，显然 defer 是最接近我们对于应用脚本加载和执行的要求的
	- 关于 defer，是按照加载顺序执行脚本的，这一点要善加利用
	- async 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行
仔细想想，async 对于应用脚本的用处不大，因为它完全不考虑依赖（哪怕是最低级的顺序执行），不过它对于那些可以不依赖任何脚本或不被任何脚本依赖的脚本来说却是非常合适的，最典型的例子：Google Analytics


## 参考：
1. https://segmentfault.com/q/1010000000640869