// 模块 主要是解决协同开发的问题
// 避免全局变量 防止重名 不要使用对象的模式
// 模块化都是靠闭包实现的
// require amd 
// commonjs 规范的诞生  esmodule
// 1.如何定义模块 node中一个文件就是一个模块
// 2.如何引用别人模块 require
// 3.怎么导出一个模块给别人用 module.exports

// 文件模块 自己写的模块 需要./引入
// node 它靠的是文件读取

let str = require('./1.js');
let b = 100;
// 把一个字符串函数当作js来执行

let fn = `(function a(){let b = 1;console.log(b)})()`;
// 内置模块 vm / fs 沙箱
let vm = require('vm');
vm.runInThisContext(fn);

let fs = require('fs');
try{
  fs.accessSync('1.test.js');
}catch(e){
  console.log(e);
};
// 把一个相对路径 转化成绝对路径
// __dirname表示的是当前的文件所在的文件夹
let path = require('path');
console.log(path.resolve(__dirname,'1.test.js'));
console.log(path.join(__dirname,'1.test.js'));
console.log(path.resolve('a','/'));
console.log(path.join('a','/'));
console.log(path.extname('1.min.js'));
console.log(path.basename('1.min.js','.min.js'));

// runinthisContext 在当前沙箱中执行
// fs.accessSync 判断文件是否可以访问的到
// path.resolve join extname basename