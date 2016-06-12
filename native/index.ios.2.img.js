/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 图片相关
 */

'use strict'; //开启 Strict Mode

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView
} from 'react-native';


class AwesomeProject extends Component {

  // 在图片后方加后缀, @2x, @3x等,
  // packager: react-native会默认根据设备情况而定,只有实际被用到（即被require）的图片才会被打包到你的app。
  // Packager就会根据平台而选择不同的文件。my-icon.ios.png和my-icon.android.png
  // 本地文件用 require 会更合适,可以获取到图片的相关信息, 后期可能支持精灵图


  // 背景图片
  // 直接在image标签内添加文字: <Text>Inside</Text> 或者其他.

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./img/img.png')}
        >
          <Text style={styles.red}>
            Inside
          </Text>
        </Image>
        <Image
          source={require('./img/check.png')}
          style={styles.thumbnail}
        >
          <Text style={styles.red}>
            Inside
          </Text>
        </Image>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,    // flex属性是flex-grow, flex-shrink 和 flex-basis的简写
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    alignSelf: 'center',
    width: 53,
    height: 81
  },
  red: {
    alignSelf: 'flex-end',
    color: 'red',
    backgroundColor: 'transparent'
  }
});

// AppRegistry 定义了App的入口，并提供了根组件。
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
