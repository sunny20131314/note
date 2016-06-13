'use strict';

import React, {Component} from 'react';
var ReactNative = require('react-native');
var {
  AppRegistry,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
  } = ReactNative;

import ListViewScroll from './index.ios.0.fastStart';

class AwesomeProject extends Component {
  render() {
    return <ListViewScroll />;
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
