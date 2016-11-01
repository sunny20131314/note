# 常用的表单验证相关


//密码需为6-12位字母、数字、特殊符号的组合，至少包含两种，区分大小写,特殊 字符!#$%^&*为其中之一	
```js
var pattern = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,12}$/;
```
	
用户名格式规则： 5-12位，可包含汉字、字母、数字和'_'（下划线），首字符必须为字母.	

```jsvar pattern = /^[a-zA-z][a-zA-Z0-9_\u4e00-\u9fa5]{4,11}$/;

```
	
```js
var COM = {
    isEmpty: function ($selector, type) { //判断值是否为空,为空返回返回false
      switch (type) {
        case 'input': {
          if ($.trim($selector.val()) === '') {
            return false;
          }
        }
          break;
        case 'select': {
          if ($.trim($selector.val()) == 0) {
            return false;
          }
        }
          break;
        case 'checkbox': {
          if (!$('input[name=agreement]').prop('checked')) return false;
        }
          break;
      }
      return true;
    },
    checkAll: function ( $objs ) { //传入jquery对象,检查是否有值为空
      var bool = true;
      $objs.each(function () {
        if ($(this).val() == '') {
          bool = false;
          return false;
        }
      });
      return bool;
    },
    tipShow: function ($tip, txt) {//表单提示显示
      $tip.text(txt);
      $tip.fadeIn();
    },
    tipHide: function ($tip) {//表单提示隐藏
      $tip.fadeOut();
      $tip.text('');
    },
    clearVal: function($el){ //清除
      $el.val( '' );
    }
  };
```