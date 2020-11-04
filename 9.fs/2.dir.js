// 创建目录 和删除目录 

let fs = require('fs');
// 创建目录 需要保证创建的目录父级存在
// 想创建一个项目工程

// 文件存在后不能再次创建  fs.access
function mkdir(p,callback) {
  let dirs = p.split('/');
  let index = 0;
  function next() { // next方法榜知我们来进行迭代操作
    if(index === dirs.length) return callback();
    let currentPath = dirs.slice(0,++index).join('/');
    fs.access(currentPath,function (err) {
      if(err){
        fs.mkdir(currentPath,function () {
          next(); 
        });
      }else{
        next(); // 当前文件夹存在就继续迭代
      }
    })
  }
  next();
}
mkdir('a/b/c',function () {
  console.log('创建完成')
});
// function mkdirSync(p) {
//   let dirs = p.split('/'); // [m,q,d]
//   for(let i = 0 ; i<dirs.length;i++){
//     let currentPath = dirs.slice(0,i+1).join('/');
//     try{
//       fs.accessSync(currentPath);
//     }catch(e){
//       fs.mkdirSync(currentPath);
//     }
//   }
// }
// mkdirSync('m/q/d');
