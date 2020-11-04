let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack')
module.exports = {
  optimization:{ 
    minimizer:[ 
      new UglifyJSPlugin({
        cache:true,
        parallel:true, 
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
    port:3000
  },
  externals:{ // 排除掉 jquery打包
    'jquery':'$'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$':'jquery' // 这个$ 并不是全局的
    }),
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
      {
        test:/\.(png|jpg|gif)$/,
        // url可以传递一个参数  limit 限制大小在限制之内那么内容会变成base64,如果大于了限制 就会用file-loader
        use:{
          loader:'url-loader',
          options:{
            limit:200*1024
          }
        }
      },
      {
        test:/\.html$/,
        use:'html-withimg-loader'
      },



      // {
      //   test:require.resolve('jquery'),
      //   use:'expose-loader?$'
      // },
      
      
      // es6 更高级的语法 转化成es5 Promise 
      // 用babel 需要哪几个包  babel-loader => @babel/core => @babel/preset-env 

      // 代码校验 eslint(用法非常像 less) eslint eslint-loader
      // {
      //   test:/\.js$/,
      //   enforce:'pre', // 必须在前面执行 先校验代码
      //   use:'eslint-loader'
      // },
      { 
        test:/\.js$/,
        exclude:/node_modules/, // 排除查找node_modules目录
        include:path.resolve('src'),
        use:{
          loader: 'babel-loader',
          options:{
            // arrowFnPlugin ....
            presets: ['@babel/preset-env'],
            // 转化 js运行时的api 方法 并且可以优化js 抽离公共部分
            plugins:['@babel/plugin-transform-runtime']
          }
        }
      },
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.css$/, use: 'postcss-loader' },
      { test: /\.css$/, use: MiniCssExtractPlugin.loader, enforce: 'post' },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','less-loader'] }
    ]
  },
  mode: 'development'
}
// 第三方的库 jquery (window.jquery)


// 其他的 一些配置和优化 