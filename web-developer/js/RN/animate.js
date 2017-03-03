/*
* 动画查看： http://www.jianshu.com/p/3ce1d27fc246
* requestAnimationFrame
* setNativeProps
* LayoutAnimation
* */
import React, { Component } from 'react';
import {
  LayoutAnimation,
  NativeModules,
  AppRegistry,
  StyleSheet,
  StatusBar,
  Navigator,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';


class Animate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100
    };
  }
  startAnimationState() {
    var count = 0;
    while (++count < 50) {
      requestAnimationFrame(() =>{
        this.setState({
        width: this.state.width + 1,
        height: this.state.height + 1
      });
    });
    }
  }
  startAnimationNative() {
    var count = 0;
    while (++count < 50) {
      requestAnimationFrame(() => {
        this.refs.image.setNativeProps({
          style: {
            width: this.state.width++,
            height: this.state.height++
          }
        });
      });
    }
  }
  startAnimationLayout() {
    LayoutAnimation.configureNext({
      duration: 700, //持续时间
      create: { // 视图创建
        // duration?: number,
        // delay?: number,  延迟指定时间（单位：毫秒
        // springDamping?: number, 弹跳动画阻尼系数（配合spring使用）
        // initialVelocity?: number, 初始速度
        type: LayoutAnimation.Types.spring, //  spring：弹跳  linear：线性 easeInEaseOut：缓入缓出 easeIn：缓入 easeOut：缓出
        property: LayoutAnimation.Properties.scaleXY,// opacity、scaleXY
      },
      update: { // 视图更新
        type: LayoutAnimation.Types.spring,
      },
      delete: {
        // 删除时的动画
      }
    });
    this.setState({width: this.state.width + 10, height: this.state.height + 10});
  }

  startAnimationLayout2() {
    // 我们还可以通过LayoutAnimation.create这个函数更简单的创建一个config，
    // 同样可以实现 startAnimationLayout 一样的效果。
    // create函数接受三个参数：
    //     duration：动画持续时间。
    //     type：create和update时的动画类型，定义在* LayoutAnimation.Types。
    //     creationProp：create时的动画属性，定义在LayoutAnimation.Properties。

    LayoutAnimation.configureNext(LayoutAnimation.create(700,
      LayoutAnimation.Types.spring,
      LayoutAnimation.Properties.scaleXY));
    this.setState({width: this.state.width + 10, height: this.state.height + 10});
  }
  startAnimation(a) {
    if (a == 0) {
      this.startAnimationState();
    }
    else if (a == 1) {
      this.startAnimationNative();
    }
    else if (a == 2) {
      this.startAnimationLayout();
    }
    else if (a == 3) {
      this.startAnimationLayout2();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source = { require('./img/icon_list_dot_red.png') }
               ref='image'
               style={{width: this.state.width, height: this.state.height}}/>
        <TouchableOpacity style={styles.instructions} onPress={()=>this.startAnimation(3)}>
          <Text style={{alignSelf: 'center', color: '#FFFFFF'}}>Press me!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});
AppRegistry.registerComponent('AwesomeProject', () => Animate);
