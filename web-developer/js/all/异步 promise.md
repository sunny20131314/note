# 异步

## callBack转异步
如下实例是针对通用的回调转换为异步格式

```js
// es6:
let promisify = (fn, receiver) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(receiver, [...args, (err, err) => {
        return res ? resolve(res) : reject(err);
      }]);
    });
  };
};

// es5:
function promisify(fn, receiver) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new Promise(function (resolve, reject) {
      fn.apply(receiver, [].concat(args, [function (err, res) {
        return res ? resolve(res) : reject(err);
      }]));
    });
  };
}


//包装为 Promise 接口
var getIpPromise = promisify( NetworkInfo.getIPAddress, NetworkInfo ); 


// promise then 的使用
getIpPromise()
  .then(
    (ip) => {
      console.warn( 'getIpFn ip: ' , ip  );
    }
  )
  .catch(e => {console.warn(e)});
  
// async  await 
let getIp = async () => {
  let res = await getIpPromise();
  console.log( res, 'res' );
  alert(res);
};
getIp();


// 或者匿名函数的写法
(async () => {
  let res = await getIpPromise();
  console.log( res, 'res' );
  alert(res + 'ip');
})();  
   
```


针对某个方法：

```js
let getIpPromise = () => {
  return new Promise((resolve, reject) => {
    try{
      NetworkInfo.getIPAddress( (res, err) => {
        return res ? resolve(res) : reject(err);
      });
    }catch(ex){
      reject(ex);
    }
  });
};

(async () => {
  let res = await getIpPromise();
  console.log( res, 'res' );
  alert(res + 'ip');
})();
```
