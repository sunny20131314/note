# 常用的表单验证相关


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