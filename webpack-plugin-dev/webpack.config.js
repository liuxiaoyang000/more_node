let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let DonePlugin = require('./plugins/DonePlugin');
let AsyncPlugin = require('./plugins/AsyncPlugin');
let FileListPlugin = require('./plugins/FileListPlugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 同步插件 tap 和 异步插件 tapAsync tapPromise
let InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
let UploadPlugin = require('./plugins/UploadPlugin');
let webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.css$/,
         use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins: ['@babel/plugin-syntax-dynamic-import'] import()
          }
        }
      }
    ]
  },
  devServer:{
    hot:true, // 开启热更新
  },
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath:'http://img.fullstackjavascript.cn/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    // new InlineSourcePlugin({
    //   match: /\.(css|js)$/
    // }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new UploadPlugin({
    //   bucket: 'jwstatic',
    //   domain: "img.fullstackjavascript.cn",
    //   accessKey: 'uimQ1Inof5KwcA5ETlLMnwoJzrIhigEEilWMpJtg',
    //   secretKey : 'zNoP0z1XzHFGN0JMJsxSEvLRcFPXxAVaXEDWOwdH'
    // })
    // new FileListPlugin({
    //   filename:'filelist.md'
    // })
    // new DonePlugin(),
    // new AsyncPlugin()
  ]
}