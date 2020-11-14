/*
 * @Author: wb szm648998@alibaba inc.com
 * @Date: 2020 03 06 20:04:31
 * @LastEditors: wb-szm648998@alibaba-inc.com
 * @LastEditTime: 2020-03-08 21:59:10
 * @Description:
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: './',
  },
  // 文件映射，for 找错误
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   // contentBase: './dist',
  //   hot: true,
  //   compress: false,
  //   port: 9000,
  // },
  plugins: [
    // 清除打包文件
    new CleanWebpackPlugin(),
    // 分包打包
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './public/index.html'
    }),
  ],
};
