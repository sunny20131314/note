// 1. = 操作符优先级
function equalOperate() {
  let a = { n: 1 };
  const b = a;
  a.x = a = { n: 2 };
  console.log('a', a, 'b', b, 'a.x', a.x, 'b.x', b.x);
}
// equalPOperate();
// 解析:
// = 操作符优先级，从右向左
// 读取变量，分为 从左向右，从右向左

// 第2行: b = a = {n: 1}, 变量a/b指向同一个指针
// 第3行: (a.x =)  => 查找到变量a:也就是对象 {n:1}, 并为其创建其属性x，对其赋值
// a = {n: 2} => 对变量a赋值 对象 {n: 2}, 并讲对象 {n: 2} 的指针返回
// 即连起来等同于 => : ({n:1}).x = (a = {n:2})
// 故: b.x = {n: 2}
// a: {n: 2}
// 引申：
// a = b = 5;
// 结果 a 和 b 的值都会成为5。这是因为赋值运算符的返回结果就是赋值运算符右边的那个值，具体过程是：b被赋值为5，然后a也被赋值为 b=5 的返回值，也就是5。
// res: a { n: 2 } b { n: 1, x: { n: 2 } } a.x undefined b.x { n: 2 }

function equalOperate1() {
  const a = { n: 1 };
  let b = a;
  a.x = b = { n: 2 };
  console.log('a', a, 'b', b, 'a.x', a.x, 'b.x', b.x);
}
// a { n: 1, x: { n: 2 } } b { n: 2 } a.x { n: 2 } b.x undefined
equalOperate1();
