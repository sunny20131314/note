// 解析html（load）
// $( selector, [context], [root] )
const cheerio = require('cheerio');
// console.log(cheerio, 'cheerio');
const html = `
  <ul id="fruits">
    <li class="apple">Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
  </ul>
  `;

const $ = require('cheerio').load(html);
// console.log($, '$');

// 获取属性值
console.log(
  $('ul'),
  $('ul').attr('id'),
  $('.apple', '#fruits').text(),
  $('ul .pear').attr('class'),
  // note: 通过 html() 访问到的是 子元素
  $('ul').html(), // li li li
  // $('li[class=orange]').html(),
  $('li').text() // AppleOrangePear
);

// 获取和更改属性
console.log($('.apple').attr('id', 'favorite').html());

// 把HTML字符串作为上下文也是可以的：
// const $ = require('cheerio');
// $('ul', html);

// // HTML字符串作为root
// const $ = require('cheerio');
// $('li', 'ul', html);

// // 有自定义配置时
// $ = require('cheerio').load(html, {
//   ignoreWhitespace: true,
//   xmlMode: true,
// });
