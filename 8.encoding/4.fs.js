// 希望用有限的内存 读取无限的数据

// 我们可以采用精确的读取方式

let fs = require('fs');
// node中默认会占用0 ， 1， 2三个描述符 linux操作文件 1024
// process.stdin 0
// process.stdout1
// process.stderr2

// 打开文件后可以读取文件
// fs.open('a.md','r',function (err,fd) {
//   let buffer = Buffer.alloc(3); // 只能放三勺水
//   // fd文件描述符 buffer读取到哪里
//   // 0 代表的是从buffer的哪个位置读取 
//   // 3 代表的是读取的个数
//   // 0 代表的是读取文件的位置
//   fs.read(fd,buffer,0,3,0,function (err,bytesRead) {
//     // bytesRead 真实读取的字节数
//     console.log(buffer);
//     fs.close(fd,()=>{
//       console.log('关闭')
//     })
//   })
// });

// 写入
fs.open('a.md','w',function (err,fd) {
  let buffer = Buffer.from('珠峰');
  // fd代表的是文件描述符
  // 0 代表的是把buffer的第一个位置开始写入
  // 2 代表写入的个数
  // 0 写到文件的哪个位置中
  fs.write(fd, buffer,0,3,0,function (err,written) {
   fs.fsync(); // 最后应该调用此方法 更新内存将文件写入到磁盘中
  });
});
// 实现一个拷贝 用 fs.open fs.read fs.write实现一个拷贝文件的功能

// 周六 
// 周日 