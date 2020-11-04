let fs = require('fs');
let path = require('path');
// 我知道肯定是个文件夹 
// 只能读取当前目录下的一层文件
let dirs = fs.readdirSync('a');
// 涉及到遍历目录的问题
dirs = dirs.map(d=>path.join('a',d));
dirs.forEach(d=>{
  let statObj = fs.statSync(d); // 判断当前路径的状态 它返回的是一个状态对象
  if (statObj.isDirectory()){
    fs.rmdirSync(d);
  }else{
    fs.unlinkSync(d);
  }
});
fs.rmdirSync('a');
// fs.rmdirSync 删除目录的
// fs.unlinkSync 删除文件的