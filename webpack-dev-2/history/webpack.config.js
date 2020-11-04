// commonjs 规范 
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:{
    main:'./src/index.js',
    login:'./src/login.js'
  },
  output:{
    filename:'[name].js',
    path: path.resolve('dist')
  },
  devServer:{
    contentBase:'./dist', // 默认是当前项目的根目录
    // open:true
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      filename:'index.html',
      chunks:['main']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'login.html',
      chunks:['login','main']
    })
  ],
  mode:'development'
}

// npx  -> scripts