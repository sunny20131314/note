## DocumentFragments

[DocumentFragments](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)
> DocumentFragments 是一些DOM节点。它们不是DOM树的一部分。
通常的使用场景是创建一个文档片段，然后将创建的DOM元素插入到文档片段中，
最后把文档片段插入到DOM树中。在DOM树中，文档片段会被替换为它所有的子元素。

>  因为文档片段存在与内存中，并不在DOM树中，
所以将子元素插入到文档片段时不会引起页面回流(reflow)(对元素位置和几何上的计算)。
因此，使用文档片段document fragments 通常会起到优化性能的作用(better performance)。

```
    var docfrag = document.createDocumentFragment();
    var browserList = ["Internet Explorer", "Mozilla Firefox", "Safari", "Chrome", "Opera"];

    browserList.forEach(function(e) {
      var li = document.createElement("li");
      li.textContent = e;
      docfrag.appendChild(li);
    });

    document.body.appendChild(docfrag);// a list with well-known web browsers
```
使用createDocumentFragment主要是因为避免因createElement多次添加到document.body引起的效率问题,而在现在浏览器上并没有什么区别

1, createElement创建的元素可以使用innerHTML，
createDocumentFragment创建的元素使用innerHTML并不能达到预期修改文档内容的效果，只是作为一个属性而已。
两者的节点类型完全不同，并且createDocumentFragment创建的元素在文档中没有对应的标记，
因此在页面上只能用js中访问到。
```
    var fragment_1 = document.createDocumentFragment();
    fragment_1.innerHTML = '<p>我是一个粉刷匠</p>';
    fragment_1.innerHTML = 'dddd';
    document.body.appendChild(fragment_1);
    var fragment_2 = document.createElement('p');
    fragment_2.innerHTML = '粉刷本领强';
    document.body.appendChild(fragment_2);

    //页面上只添加了 <p>粉刷本领强</p>
```

2, 另一个最主要的区别就是createElement创建的元素可以重复操作，
添加之后就算从文档里面移除依旧归文档所有，可以继续操作，
但是createDocumentFragment创建的元素是一次性的，添加之后再就不能操作了
（说明：这里的添加并不是添加了新创建的片段，因为上面说过，
新创建的片段在文档内是没有对应的标签的，这里添加的是片段的所有子节点）。

```

  var div = document.createElement('div');
  div.innerHTML = '<p>测试createElement</p>';
  document.body.appendChild(div);
  setTimeout(function(){
    document.body.appendChild(div);
    setTimeout(function(){
      document.body.removeChild(div);
    },10000)
  },10000);

  var p = document.createElement('p');
  p.innerHTML = 'p 测试DocumentFragment';
  var fragment = document.createDocumentFragment();
  fragment.appendChild(p);
  fragment.innerHTML = '<p> ppp 测试DocumentFragment</p>';
  fragment.innerHTML = '<span> span 测试DocumentFragment</span>';
  console.log( fragment.innerHTML );  // <span> span 测试DocumentFragment</span>
  document.body.appendChild(fragment);
  //页面上只添加了 <p>p 测试DocumentFragment</p>,修改innerHTML 并没有作用
  setTimeout(function(){
    document.body.appendChild(fragment);
    //报错，因为此时文档内部已经能够不存在fragment了
    // 真相是不报错
    setTimeout(function(){
      document.body.removeChild(fragment);
      // The node to be removed is not a child of this node.
    },1000)
  },1000)
```
