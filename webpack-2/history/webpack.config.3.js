let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let UgligyJsPlugin = require('uglifyjs-webpack-plugin');
let OptimizeCssAssetsPlugin =  require('optimize-css-assets-webpack-plugin');
module.exports = {
  optimization:{
    minimizer:[ 
      new UgligyJsPlugin({
        cache:true,
        parallel:true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  mode:'development',
  entry:{
    main: './src/index.js'
  },
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  },
  module:{
    rules:[ 
      {
        test:/\.html/,
        use:'html-withimg-loader'
      },
      {
        test:/\.(png|gif|jpg)/,
        use:'file-loader' // 可以把图片进行拷贝操作
      },
      {
        test:/\.js$/,
        exclude:/node_modules/, 
        use:['babel-loader']
      },
      // {
      //   test:/\.js$/,
      //   exclude:/node_modules/, //派出不需要检测的模块
      //   use:['babel-loader','eslint-loader']
      // },
      {
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
        'css-loader','postcss-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename:'index.html'
    }),
    new MiniCssExtractPlugin({
      filename:'main.css'
    })
  ]
}