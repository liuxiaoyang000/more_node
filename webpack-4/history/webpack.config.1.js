let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Happypack = require('happypack');
let webpack = require('webpack');
module.exports = {
  optimization:{
   
  },
  mode:"production",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        include: path.resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
        
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins:[
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    new HtmlWebpackPlugin({
      template:'index.html'
    })
  ]
}
// 1) dllPlugin 动态链接库
// 2) exclude include
// 3) IgnorePlugin
// 4) happypack 默认开启 4个线程 多线程打包 进程里包括了一条主线程 node中可以开子进程 
// cpu i5 4  i7 8 
// 5) webpack 3 需要处理一些情况 tree shaking 作用域处理Scope Hosting

