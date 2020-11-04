let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Happypack = require('happypack');
let webpack = require('webpack');

// 动态懒加载
module.exports = {
  mode: "development",
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env"
            ],
            plugins:[
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }]
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}