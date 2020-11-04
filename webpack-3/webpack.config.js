let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack');
let ReferencePlugin = require('webpack/lib/DllReferencePlugin')

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dista')
  },
  module: {
    rules: [
      {
        test: /\.js$/, use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // new ReferencePlugin({
    //   manifest:path.resolve(__dirname,'dista','mainfest.json'),
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }), 
    new webpack.DefinePlugin({ // 定义环境变量
      PRODUCTION:JSON.stringify('dev'),  // console.log("dev"),
      FLAG:'true',
      EXPRESSION:JSON.stringify("1+1")
    }),
    new webpack.BannerPlugin('make 2017 by jw')
  ],
}

// webpack  热加载 webpack优化 多线程打包 treeshaking 
// ast 语法树 