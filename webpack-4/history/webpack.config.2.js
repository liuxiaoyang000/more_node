let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Happypack = require('happypack');
let webpack = require('webpack');

// index a b jquery
// other a b jquery
// about jquery
module.exports = {
  optimization:{
    splitChunks:{ // 分割代码 缓存用 把 a和bjs 打包成一个 缓存下来
      cacheGroups:{ // 只在多页面中使用
        common:{
          chunks:'initial', // 入口中有公共的抽离
          minSize:0, // 只要有字节是共用的我就提出来
          minChunks:2, // 最少引用多少次才可以被提出来
        },
        vendor:{
          priority:1, // 优先级比common更高
          test:/node_modules/,
          chunks: 'initial',
          minSize: 0, 
          minChunks: 2, 
        }
      }
    }
  },
  mode:"production",
  entry: {
    index:'./src/index.js',
    other:'./src/other.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        include: path.resolve('src'),
        use: 'happypack/loader?id=js'
        
      },
      {
        test: /\.css$/, use: 'happypack/loader?id=css'
      }
    ]
  },
  plugins:[
    new Happypack({
      id:'css',
      use: ['style-loader', 'css-loader']
    }),
    new Happypack({
      id:'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-env"
          ]
        }
      }]
    }),
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
// 5) webpack 3 需要处理一些情况 tree shaking
// 6) 提取公告代码的插件 也是配置优化项 splitChunks

/**
 * home  a.js b.js
 * login a.js b.jsddd
 * about a.js b.js
 * 
 */