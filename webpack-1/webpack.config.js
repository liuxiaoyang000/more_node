// webpack配置文件 配置文件 只能用commonjs规范  基于node
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development', // 写上是开发的模式
  entry: "./src/index.js", // 入口文件 从哪个文件开始打包
  output: {
    path: path.resolve(__dirname, 'dist'), //路径必须是绝对路径
    filename: 'bundle.js'
  },
  module: {
    rules: [ // 用此规则来解析 css-loader style-loader
      // css-loader 会解析文件中 @import
      // 使用 less 需要下载 less less-loader
      // 使用 scss 需要安装 node-sasss sass-loader
      // 使用 stylus 安装 stylus stylus-loader

      // loader的写法有三种 [] 字符串
      { test: /\.css/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: { // .babelrc文件
            presets: [
              '@babel/preset-env'
            ],
            "plugins": [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          }
        },
        exclude:/node_modules/ // 编译js 的时候 哪些文件需要包含进来
      }
    ]
  },
  devServer: { // 开发服务的配置
    contentBase: './dist',
    port: 3000,
    progress: true,
    compress: true, // 启动服务端压缩
  },
  plugins: [
    new HtmlWebpackPlugin({
      // filename:'index.html'
      template: './public/index.html',
      minify: {
        removeAttributeQuotes: true,
        removeTagWhitespace: true,
      },
      hash: true
    })
  ]
  // webpack的配置 loader 转化器 加载器  plugin 插件
}
// html-webpack-plugin 打包html的作用
// css 匹配出所有的css  sytle-loader css-loader
// js @babel/preset-env 可以转化 所有的标准 
// 预设是插件的集合 配置代码转化的时候 会有.babelrc plugins presets

// js 匹配出所有的js 用babel去转化  @babel/core babel核心包 babel-loader babel加载器 @babel/preset-env  转化es6-> es5

// 解析es7 class-properties @babel/plugin-proposal-class-properties


// 解析装饰器 @babel/plugin-proposal-decorators