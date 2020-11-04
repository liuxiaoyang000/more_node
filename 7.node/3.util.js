let util = require('util'); // 工具方法

// let fs = require('fs');
// 将回调的方式转化promise
// let read = util.promisify(fs.readFile);

// mz 这个模块会自动把node的模块转化成promise的形式

// let fs = require('mz/fs');
// fs.readFile('1.test.js','utf8').then(data=>{
//   console.log(data)
// })

// 继承的方法 node中有大量的继承 构造函数 继承
// Child.prototype.__proto__ = Parent.prototype;
// Object.create();
// Object.setPrototypeOf()
// 继承
util.inherits(); // 继承原型上的属性 公有属性

// node主要的靠的事件驱动 发布订阅