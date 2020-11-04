let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack');
module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  resolve:{ // commonjs 查找路径 require('mime') mime:main:""
    modules:[path.resolve('node_modules'),path.resolve('vendor')], // 查询文件的位置
    extensions:['.js','.json','.css'], // 扩展名
    mainFields:['main','browser'], // 主文件
    mainFiles:['index.js'], // 入口文件
    alias:{ // 别名
      bootstrap:'bootstrap/dist/css/bootstrap.css',
    }
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'build')
  },
  // source-map 源码映射 把当前源代码和打包后的代码 做一个映射关系
  // 在生产环境中，进行调试 前端监控
  // devtool:'source-map', // 他会单独创建一个源码映射文件，指定到当前行和列
  // devtool:'eval-source-map', // 不分离
  // cheap不会定位到列数
  // devtool:'cheap-module-source-map', // babel编译后的内容
  // devtool:'cheap-module-eval-source-map', // 生成环境不要source-map


  // 假如要上线了 发现了个bug 我希望边更改 边重新打包
  // watch:true, // 实时监控
  // watchOptions:{
  //   poll:1000,
  //   aggregateTimeout:2000, // 防抖
  //   ignored:/node_modules/ 忽略掉 node_modules文件夹
  // },
  module: {
    // 优化哪些不进行模块的解析
    noParse:/jquery/, // 有些文件 不是第三方 就是我自己写的js require
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
    // new CleanWebpackPlugin('./dist'),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // new CopyWebpackPlugin([{
    //   from:'./src/ppt',
    //   to:path.resolve(__dirname,'assets')
    // }]),
    new webpack.BannerPlugin('make 2017 by jw')
  ],
  devServer:{ // 在webpack这一层来解决跨域
    // before(app){ // dev-server开启之前
    //   app.get('/api/user',function(req,res){
    //     // todo
    //     res.send({age:19});
    //   })
    // }
    // proxy:{
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{
    //       '/api':''
    //     }
    //   }
    // }
  }
}
// http-proxy
// 前端有个服务 8080 => 3000
// webpack-dev-server 内置了express  webpack-proxy-middleware

