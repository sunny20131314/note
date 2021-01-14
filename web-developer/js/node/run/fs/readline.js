/**
 * 输入输出

 * can't run
 */


// 引入readline模块
const readline = require('readline');

//创建readline接口实例
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
​
// question方法
rl.question("你的名字是？",function(answer){
    console.log("我的名字是："+answer);
    // 不加close，则程序不会结束
    rl.close();
});
​
// close事件监听
rl.on("close", function(){
   // 结束程序
    process.exit(0);
})