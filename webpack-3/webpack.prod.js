let base = require('./webpack.base.js');

let merge = require('webpack-merge');

module.exports = merge(base,{
  mode:'production',
  optimization:{
    minimizer:[
      // new UglifyJs
      // new cssasertwebpack-plguin
    ]
  }
});

// 自己写的文件 react react-dom react-router-dom
// dll 动态链接库 xxx.dll
// 上线的时候 体积是不变的 开发时打包速度 应该会有明显的变化