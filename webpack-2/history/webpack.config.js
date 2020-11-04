let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:{
    main: './src/index.js',
    other:'./src/other.js'
  },
  output:{
    // .[hash:8] 所有静态资源都应该增加.[hash:8]
    filename: '[name].js',
    // 必须是绝对路径
    path: path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename:'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      filename:'other.html',
      chunks:['other']
    })
  ]
}