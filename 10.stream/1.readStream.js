// 流 并不关心整体文件大小，每次读一点 从哪个位置读取到哪里
// 流 分为可读流 写流 双工流 
// 流读取文件时 需要用到文件的流

let fs = require('fs'); // fs.read
// rs就是可读流的对象 ， 通过可读流 创建出来的实例
let rs = fs.createReadStream('./a1.md',{
  flags:'r',
  encoding:null,
  autoClose:true,
  start:0,
  end:6, // 包前又包后
  highWaterMark:3 // 每次读取64k
  // 读 2 写 4 执行 1
}); // 不用显示的调用fs.read方法
// events EventEmitter
// 默认数据不会过来 rs.emit('data','xxx')

// 默认情况下 非流动模式，如果监听了on('data')事件，就会变成流动模式，不停的读取文件将文件读取完毕最快的速度，最终会触发on('end ')事件
rs.on('open',function () {
  console.log('文件被打开了')
})
rs.on('data',function (data) {
  console.log(data);
  rs.pause(); // 让当前的on('data')事件暂停触发
});
setTimeout(() => {
  rs.resume(); // 恢复触发on('data')事件
}, 1000);
rs.on('end',function () {
  console.log('读取完毕')
});
rs.on('close',function () {
  console.log('关闭')
});
rs.on('error',function (err) {
  console.log('文件出错了')
})