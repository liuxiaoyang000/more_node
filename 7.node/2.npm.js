// 下载别人的包来使用
// 安装第三方包 有两种方式 全局安装  本地安装
// npm install xxx -g 全局 只能在命令行中使用，工具类的
// npm install nrm -g 
// npm install http-server -g


// 本地安装 node package manager  
// 先初始化一下 npm init -y
// npm install jquery  默认叫项目依赖 上线开发都需要
// npm instlal @babel/cli -D 开发的时候使用 上线不用了

// yarn 也是一个包管理工具 快 后面能用yarn 
let mime = require('mime');
// console.log(mime);
console.log(module.paths);


// 当前node_module下 如果有文件和 文件的js文件 会先走js文件

let a = require('./a');
// 如果有文件先找文件,没有文件找文件夹 node 10以上
console.log(a);