/**
 * Created by sunzhimin on 9/8/16.
 * 导航栏
 * configureScene 配置导航栏效果
 *
 * handleBack 是对返回的处理
 * ignoreBack 忽视返回
 *
 */

import React, { Component } from 'react';
import {
  Image,
  Animated,
  Easing,
  NativeModules,
  BackAndroid,
  InteractionManager,
  AppRegistry,
  StyleSheet,
  StatusBar,
  Navigator,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
SplashScreen.hide();
class Demo8 extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      bounceValue: new Animated.Value(0),  // scale
      rotateValue: new Animated.Value(0),
      fadeOutOpacity: new Animated.Value(0),  // 一维坐标
      translateValue: new Animated.ValueXY({x:0, y:0}), // 二维坐标
    };

    this.show = 3;
  }
  render() {
    if ( this.show === 2 ) {
      // transform是一个变换数组，常用的有：
      //                               scale, scaleX, scaleY,
      //                               translateX, translateY,
      //                               rotate, rotateX, rotateY, rotateZ
      //

      return (
        <Animated.View // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
          style = {{flex: 1,alignItems: 'center',justifyContent: 'center',
            transform: [
              {translateX: this.state.translateValue.x}, // x轴移动
              {translateY: this.state.translateValue.y}, // y轴移动
            ]
          }}>
          <Image source = {require('./img/icon_about_logo@2x.png')}
                 style = {{width: 400,height: 400}}/>
        </Animated.View >
      );
    }
    else if ( this.show === 3 ) {
      // 插值函数：将输入值范围转换为输出值范围，如上：将0-1数值转换为0deg-360deg角度，旋转View时你会用到
      //          interpolate
      return (
        <Animated.View // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
          style = {{flex: 1,alignItems: 'center',justifyContent: 'center',
            transform: [
              {scale: this.state.bounceValue},  // 缩放
              {translateX: this.state.translateValue.x}, // x轴移动
              {translateY: this.state.translateValue.y}, // y轴移动
              {rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']})},
            ]
          }}>
          <Image source = {require('./img/icon_about_logo@2x.png')}
                 style = {{width: 400,height: 400}}/>
        </Animated.View >
      );
    }
    return (
      <Animated.View // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
        style = {{flex: 1,alignItems: 'center',justifyContent: 'center',
          opacity: this.state.fadeOutOpacity,}}>
        <Image source = {require('./img/icon_about_logo@2x.png')}
               style = {{width: 400,height: 400}}/>
      </Animated.View >
    );
  }

  startAnimation(v = 1){
    switch (v) {
      case 1:
        this.startAnimation1();
        break;
      case 2:
        this.startAnimation2();
        break;
      case 3:
        this.startAnimation3();
        break
    }
  }

  startAnimation1 = () => {
    // use1: 一维数据改变
    this.state.fadeOutOpacity.setValue(1);
    // 循环 图片透明度2秒内从不透明到全透明，线性变化。
    Animated.timing(
      this.state.fadeOutOpacity,
      {
        toValue: 0,
        duration: 2000,
        easing: Easing.linear,// 线性的渐变函数
      }
    // ).start();
    ).start(this.startAnimation1);
    // use4: start方法可以接受一个函数，通过监听动画结束，再调用startAnimation可以重复执行动画，例如：
  };

  startAnimation2 = () => {
    // use2: 二维数据改变
    this.state.translateValue.setValue({x:0, y:0});
    Animated.decay( // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
      this.state.translateValue,
      {
        velocity: 10, // 起始速度，必填参数。
        deceleration: 0.8, // 速度衰减比例，默认为0.997。
      }
    ).start();
    // ).start(this.startAnimation2);
  };

  startAnimation3() {
    this.state.bounceValue.setValue(1.5); // 设置一个较大的初始值
    this.state.rotateValue.setValue(0);
    this.state.translateValue.setValue({x: 0,y: 0});
    this.state.fadeOutOpacity.setValue(1);

    // use3: 组合动画：
    //      parallel：同时执行
    //      sequence：顺序执行
    //      stagger：错峰，其实就是插入了delay的parallel
    //      delay：组合动画之间的延迟方法，严格来讲，不算是组合动画

    Animated.sequence([
      Animated.sequence([ //  组合动画 parallel（同时执行）、sequence（顺序执行）、stagger（错峰，其实就是插入了delay的parrllel）和delay（延迟）
        Animated.spring( //  基础的单次弹跳物理模型
          this.state.bounceValue, {
            toValue: 0.8,
            friction: 1,// 摩擦力，默认为7.
            tension: 40,// 张力，默认40。
          }),
        Animated.delay(2000), // 配合sequence，延迟2秒
        Animated.timing( // 从时间范围映射到渐变的值。
          this.state.rotateValue, {
            toValue: 1,
            duration: 800,// 动画持续的时间（单位是毫秒），默认为500
            easing: Easing.out(Easing.quad),// 一个用于定义曲线的渐变函数
            delay: 0,// 在一段时间之后开始动画（单位是毫秒），默认为0。
          }),
        Animated.decay( // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
          this.state.translateValue, {
            velocity: 10,// 起始速度，必填参数。
            deceleration: 0.8,// 速度衰减比例，默认为0.997。
          }),
      ]),
      Animated.timing(this.state.fadeOutOpacity, {
        toValue: 0,
        duration: 2000,
        easing: Easing.linear,// 线性的渐变函数
      })
    // ]).start(this.startAnimation3);
    ]).start();
  }

  componentDidMount() {
    this.startAnimation(this.show);

    // use5: 监听当前的动画值：
    // addListener(callback)：动画执行过程中的值
    // stopAnimation(callback)：动画执行结束时的值

    // 监听AnimatedValueXY类型translateValue的值变化：
    this.state.translateValue.addListener((value) => {
      console.log("addListener translateValue=>x:" + value.x + " y:" + value.y);
    });
    this.state.translateValue.stopAnimation((value) => {
      console.log("stopAnimation translateValue=>x:" + value.x + " y:" + value.y);
    });
  }
}
AppRegistry.registerComponent('AwesomeProject', () => Demo8);
