// 回去 必须把可读流的原理看一下，能看懂 ，写流自己揣摩一下

let fs = require('fs');

let ws = fs.createWriteStream('1.txt', {
  flags: 'w',
  encoding: 'utf8',
  autoClose: true,
  highWaterMark: 2 // 不是代表的每次能写16k  预计我用16k来写
});

// ws可写流
// flag代表的是写入的内容 是否等于或者超过预期
// flag不能表示这个文件是否写入成功
let flag = ws.write(Buffer.from('1'), 'utf8', () => {
  console.log('write ok');
}); 
ws.write('1', 'utf8', () => {
  console.log('write ok');
});
// 会在内部把这个写的过程进行排队
// 第一次是真的像这个文件中写入 除了第一次的都会被暂存起来，等第一个人执行完成后依次调用
// drain 只有当我们写入的内容大于我们的预期，并且被清空后才会触发事件
ws.on('drain', ()=> {
  console.log('干了')
})
// 学习writeStream用法