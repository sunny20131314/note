

```js
import axios from 'axios';
import axiosCancel from 'axios-cancel';

// 使得axios具备取消的能力
axiosCancel(axios);

export const rxios = params => {
  const requestId = `${params.url + Math.random()}-xhr-id`;
  return Observable.create(observer => {
    // 观察者本身： subscribe 的入参 theObserver
    // observer 所代表的是观察者, 但不是观察者对象本身，rxjs 会对观察者做一个包装，可以理解为 observer对象是对theObserver的一个代理，所有对observer所有函数的调用会转移到theObserver的同名函数上
    axios({
      requestId,
      withCredentials: true,
      timeout: 20000,
      ...params,
    })
      .then(
        res => {
          const ores = res && res.data;
          if (ores.success) {
            observer.next((res && res.content) || {});
          } else {
            observer.error(ores);
          }
          observer.complete();
        },
        err => {
          observer.error(err);
        }
      )
      .catch(err => {
        observer.error(err);
      });
    // 返回结果，用于退订
    return {
      unsubscribe: () => {
        axios.cancel(requestId);
      },
    };
  });
};
```