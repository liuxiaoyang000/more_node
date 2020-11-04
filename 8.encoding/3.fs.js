// fs file system 文件操作系统 操作文件相关的内容

let fs = require('fs');
// fs方法中一般会有同步和异步两种方法 同步可以马上拿到返回结果，异步就通过callback的形式，异步只能error-first来获取错误

// 在写代码的时候 会采用异步的方式  好处就是不会阻塞主线
fs.readFile('./note.md',{flag:'r',encoding:'utf8'},function (err,data) {
    if(err){
      console.log(err);
    }
    console.log(data);
});
// 写入时 文件不存在会创建文件 ，如果有内容会清空内容
// fs.writeFile('./a.md', 1, function (err, data) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });
// 拷贝功能  readFile会将内容整个读取到内存中，不可能读取比内存大的文件
// 同时操作一个文件 可能会错乱，可以排序 把所有异步操作放到队列里依次执行
function copy(source,target) {
  fs.copyFile(source,target,function () {
    console.log('ok')
  });
  // fs.readFile(source,function (err,data) {
  //   fs.writeFile(target, data, { flag: 'a' },function (err) {
  //     console.log('成功')
  //   })
  // })
}
// fs.appendFile();
copy('./a.md','./b.md')