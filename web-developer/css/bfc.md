## BFC

> BFC(Block Formatting Context 块格式上下文)，简单讲，它是提供了一个独立布局的环境，每个BFC都遵守同一套布局规则。
例如，在同一个BFC内，盒子会一个挨着一个的排，相邻盒子的间距是由margin决定且垂直方向的margin会重叠。
而float和clear float也只对同一个BFC内的元素有效。

 浮动元素和绝对定位元素，
非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），
以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。

即:四种情况 BFC
float：left|right  ---- 不为none
position：absolute|fixed
display: table-cell|table-caption|inline-block|flex |inline-flex
overflow: hidden|scroll|auto    ------overflow的值不为visible


这一开始听起来可能有些困惑，因为我们在前面讨论了BFC导致外边距折叠的问题。
但我们必须牢记在心的是毗邻块盒子的垂直外边距折叠只有他们是在同一BFC时才会发生。
如果他们属于不同的BFC，他们之间的外边距将不会折叠。所以通过创建一个新的BFC我们可以防止外边距折叠。


### 文档流：
将窗体自上而下分成一行一行,
并在每行中按从左至右的挨次排放元素,即为文档流。
`浮动(float)、绝对定位(absolute)、固定定位(fixed)`三种方式定位会脱离文档流。  normal flow