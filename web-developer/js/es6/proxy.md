# 代理


## 验证表单
```js
// 环境，使用代理
/*
* 需求：
*     1、全部验证 or 每次只验证一个
*     2、使用默认提示语 or 配置提示语
*     3、配置是否需要验证！
* */
const validator = (target, validator, errorMsg) => {
  return new Proxy(target, {
    _validator: validator,
    set(target, key, value, proxy) {
      console.log( target, key, value, proxy, 'target, key, value, proxy' );
      let errMsg = errorMsg;
      if (value == '') {
        alert(`${errMsg[key]}不能为空！`);
        return target[key] = false
      }
      let va = this._validator[key]
      if (!!va(value)) {
        console.log( key, 'true' );
        return Reflect.set(target, key, value, proxy)
      } else {
        alert(`${errMsg[key]}格式不正确`)
        return target[key] = false
      }
    }
  })
};


// 策略
const validators = {
  name(value) {
    return value.length > 6
  },
  passwd(value) {
    return value.length > 6
  },
  moblie(value) {
    return /^1(3|5|7|8|9)[0-9]{9}$/.test(value)
  },
  email(value) {
    return /^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
  }
};

// const errorMsg = {}; // 相关提示语, 保存提示语
const errorMsg = { name: '用户名', passwd: '密码', moblie: '手机号码', email: '邮箱地址' }
const vali = validator({}, validators, errorMsg);

// 模拟数据
let registerForm = {
  userName: {
    value: 'fsfefsr',
    name: '用户名',
    strategy: 'name',
  },
  passWord: {
    value: '',
    name: '密码',
    strategy: 'passwd',
  },
  phoneNumber: {
    value: '13434324784',
    name: '手机号码',
    strategy: 'moblie',
  },
  emailAddress: {
    value: '798788947@qq.com',
    name: '邮箱地址',
    strategy: 'email',
  },
};

// link: https://github.com/jawil/blog/issues/19

let judge = async (form) => {
  for ( let a in form ) {
    let key = form[a];
    vali[key.strategy] = key.value;
    let res = await key.strategy;
    console.log( res, 'res _validation' )
    if ( !res ) {
      return false;
    }
  }
  return true;
  // 逻辑，依次判断，如果正确则继续，如果报错则中止。
  // 方式1： generator
  // let validatorNext = function*() {
  //   yield vali.name = registerForm.userName
  //   yield vali.passwd = registerForm.passWord
  //   yield vali.moblie = registerForm.phoneNumber
  //   yield vali.email = registerForm.emailAddress
  // }
  // let validator = validatorNext()
  // validator.next();
  // !vali.name || validator.next(); //上一步的校验通过才执行下一步
  // !vali.passwd || validator.next();
  // !vali.moblie || validator.next();
  //
  // return;
};

export default judge(registerForm);

```


## 参考
1. [探索两种优雅的表单验证——策略设计模式和ES6的Proxy代理模式](https://github.com/jawil/blog/issues/19)