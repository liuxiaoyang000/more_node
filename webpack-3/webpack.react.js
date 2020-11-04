let path = require('path');
let DllPlugin = require('webpack/lib/DllPlugin'); // webpack 内置的插件
module.exports = {
  entry:{
   react:['react','react-dom']
  },
  output:{
    filename:'_dll_[name].js', // 打包后文件的名字
    path:path.resolve(__dirname,'dista'),
    libraryTarget:'var',  // commonjs umd amd this global
    library:'_dll_[name]'
  },
  plugins:[
    new DllPlugin({ // 声明动态链接库
      name:'_dll_[name]', // 产生出去的是一个json文件
      path:path.resolve(__dirname,'dista','mainfest.json')
    })
  ]
}