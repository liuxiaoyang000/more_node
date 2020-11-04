let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let UgligyJsPlugin = require('uglifyjs-webpack-plugin');
let OptimizeCssAssetsPlugin =  require('optimize-css-assets-webpack-plugin');

// 需要手动配置优化项
module.exports = {
  optimization:{
    minimizer:[ // 必须mode是production 才会执行这个选项
      new UgligyJsPlugin({
        cache:true,
        parallel:true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  mode:'production',
  entry:{
    main: './src/index.js'
  },
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  },
  module:{
    rules:[ // loader的执行是有顺序
      {
        test:/\.css$/,
        // 抽取样式 到link标签中 mini-css-extract-plugin
        use:[
          MiniCssExtractPlugin.loader,
          // {
          //   loader: 'style-loader',
          //   options:{
          //     insertAt:'top'
          //   }
          // },
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

