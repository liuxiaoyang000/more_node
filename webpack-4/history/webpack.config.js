let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Happypack = require('happypack');
let webpack = require('webpack')
module.exports = {
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
        use: 'happypack/loader?id=js'
        
      },
      {
        test: /\.css$/, use: 'happypack/loader?id=css'
      }
    ]
  },
  plugins:[
    // 多线程打包, 项目比较复杂时 才使用 Happypack
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
    // 可以约定哪个包包要再引入了，可以自己采取引用哪个包
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