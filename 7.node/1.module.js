// 核心模块 不需要./ 操作
let path = require('path');
let fs = require('fs'); 
let vm = require('vm');
function Module(id) {
  this.id = id;
  this.exports = {}; // 导出对象
}
let obj = {
  '.js'(module){
    let content = fs.readFileSync(module.id,'utf8');
    let moduleWrap = ['(function(exports,module,require,__filename,__dirname){','})'];
    // 给字符串添加了一个函数
    let script = moduleWrap[0] + content + moduleWrap[1];
    // exports 和module有什么关系  exports是module.exports的别名
    vm.runInThisContext(script).call(module.exports, module.exports, module, req); // expors上 就有了js 导出的内容了
  },
  '.json'(module){ // 处理json的模块
     module.exports = JSON.parse(fs.readFileSync(module.id,'utf8'));
  }
}
function req(moduleId) {
  // 拿到绝对路径
  let absPath = path.resolve(__dirname, moduleId);
  // 创建模块
  let module = new Module(absPath);
  // 根据后缀名进行加载
  let ext = path.extname(absPath);
  // 加载json  加载完后 exports 会赋予最终的结果 ，并且把结果返回
  obj[ext](module);
  return module.exports;
}

// 如果文件名没找到会尝试添加后缀 .js  .json .node
let user = req('./user.js');
console.log(user);