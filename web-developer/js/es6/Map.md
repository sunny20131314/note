# Map


## 基本用法
1. 

## 使用

1、 使用
```js
const openNotificationEvent = "receiveNotification";

let listeners = new Map();

const addReceiveOpenNotificationListener = function(fn) {
  let listen = DeviceEventEmitter.addListener(openNotificationEvent, fn);
  listeners.set(fn, listen);
};

const removeReceiveOpenNotificationListener = function (fn) {
  if (!listeners.has(fn)) {
    return;
  }
  let listen = listeners.get(fn);
  listen.remove();  // 移除监听
  listeners.delete(fn);  // 删除引用
};
```


## 注意点



