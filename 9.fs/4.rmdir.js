// 同步 先序深度优先 删除目录

let fs = require('fs');
let path = require('path');
let {promisify} = require('util');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let unlink = promisify(fs.unlink);
let rmdir = promisify(fs.rmdir);
// 1.实现一个异步广度删除  
// 2.改造成async + await的写法
function wide(p){
  let arr = [p];
  let index = 0;
  let currentPath = ''
  while (currentPath = arr[index++]){ // 先取出数组中的第一个
    let statObj = fs.statSync(currentPath);
    if (statObj.isDirectory()){
      let dirs = fs.readdirSync(currentPath);
      dirs = dirs.map(d=>path.join(currentPath,d));
      arr = [...arr,...dirs];
    }
  }
  for (let i = arr.length-1; i>=0;i--){
    let statObj = fs.statSync(arr[i]);
    if(statObj.isDirectory()){
      fs.rmdirSync(arr[i]); 
    }else{
      fs.unlinkSync(arr[i]);
    }
  }
}
wide('m');


// async function removeDepParell(p) { // 删除某个路径下的文件
//     let statObj = await stat(p);
//     if (statObj.isDirectory()) {
//       let dirs = await readdir(p);
//         // 把每个路径都包装成promise方法
//         dirs = dirs.map(d => removeDepParell(path.join(p, d)));//[m/b,m/q,m/1.js]
//         // Promise.all会让dirs中的每个promise都执行，都会删除掉自己，最后中的promise成功把父级删除掉即可
//         await Promise.all(dirs); // 删除完儿子后 再删除自己 
//         await rmdir(p);
//     } else {
//       await unlink(p);
//     }
// }
// removeDepParell('m').then(() => {
//   console.log('删除成功');
// });




// function removeDepParell(p) { // 删除某个路径下的文件
//   return new Promise((resolve,reject)=>{
//     fs.stat(p,function (err,statObj) {
//       if(statObj.isDirectory()){
//         fs.readdir(p,function (err,dirs) {
//           // 把每个路径都包装成promise方法
//           dirs = dirs.map(d => removeDepParell(path.join(p, d)));//[m/b,m/q,m/1.js]
//           // Promise.all会让dirs中的每个promise都执行，都会删除掉自己，最后中的promise成功把父级删除掉即可
//           Promise.all(dirs).then(data=>{
//             fs.rmdir(p,resolve);
//           })
//         })
//       }else{
//         fs.unlink(p, resolve);
//       }
//     })
//   });
// }
// removeDepParell('m').then(()=>{
//   console.log('删除成功')
// });

// function removeDepParell(p, callback) { // 删除某个路径下的文件
//   fs.stat(p, function (err, statObj) {
//     if (statObj.isDirectory()) {
//       fs.readdir(p, function (err, dirs) {
//         dirs = dirs.map(d => path.join(p, d)); //[m/b,m/q,m/1.js]
//         if(dirs.length >0 ){ // 相当于需要并行删除
//            let index = 0;
//            function done() {
//              index++;
//              if(index == dirs.length){
//                fs.rmdir(p, callback);
//              }
//            }
//           dirs.forEach(d=>{
//             removeDepParell(d, done);
//           })
//         }else{
//           fs.rmdir(p,callback);
//         }
//       });
//     } else {
//       fs.unlink(p, callback);
//     }
//   })
// }
// removeDepParell('m', function () {
//   console.log('删除成功')
// });








// 串行的删除
// function removeDep(p,callback) { // 删除某个路径下的文件
//   fs.stat(p,function (err,statObj) {
//     if(statObj.isDirectory()){
//       fs.readdir(p,function (err,dirs) {
//         dirs = dirs.map(d=>path.join(p,d)); //[m/b,m/q,m/1.js]
//         function next(index) { // 第一次next执行 走的是第一个removeDep 第二次执行的是第二次的removeDep，第三次走的是第一次的removeDep
//           console.log(index,dirs);
//           if(index === dirs.length) return fs.rmdir(p,callback);
//           let currentPath = dirs[index]; // 删除第一个儿子
//           // 和他说一下当前目录如果删除完毕后 再删除数组的下一项
//           // a   ()=>next(index+1);
//           removeDep(currentPath,()=>next(index+1));
//         }
//         next(0);
//       });
//     }else{
//       fs.unlink(p, callback);
//     }
//   })
// }
// removeDep('m',function () {
//   console.log('删除成功')
// });



// let fs = require('fs');
// let path = require('path');
// function removeDepSync(p) { // 删除某个路径下的文件
//   let statObj = fs.statSync(p);
//   if (statObj.isDirectory()) { // 文件夹
//     let dirs = fs.readdirSync(p);
//     dirs = dirs.map(d =>path.join(p,d));
//     dirs.forEach(d=>{
//       removeDepSync(d);
//     });
//     fs.rmdirSync(p);  // 删除子目录后删除自己即可
//   } else {
//     fs.unlinkSync(p);
//   }
// }
// removeDepSync('m');