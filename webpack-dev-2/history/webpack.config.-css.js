// commonjs 规范 
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  optimization:{ // 这里可以放一些优化的配置 ,只有模式是生产环境时 才会调用此优化项
    minimizer:[ // 压缩配置
      new UglifyJSPlugin({
        cache:true,
        parallel:true, // 并行
        sourceMap:true
      }),
      new OptimizeCss()
    ]
  },
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new MiniCssExtractPlugin({
      filename:'main.css'
    })
  ],
  module: {
    rules: [
      // loader 简单 单一 style-loader  css-loader  @import
      // loader的写法 [] ''  {} 从右向左写 从下到上
      // loader的分类 preloader + normalLoader + postLoader
      // 抽离css样式 变成 link href的形式
      // mini-css-extract-plugin 

      { test: /\.css$/, use: 'css-loader' },
      { test: /\.css$/, use: 'postcss-loader' },
      { test: /\.css$/, use: MiniCssExtractPlugin.loader, enforce: 'post' },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','less-loader'] }
      // less less-loader / node-sass sass-loader / stylus stylus-loader
    ]
  },
  mode: 'production'
}
