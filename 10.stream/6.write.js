let {Writable} = require('stream');
class MyWrite extends Writable{
  _write(chunk,encoding,clearBuffer){ // 可以重写_read方法 来实现自己的逻辑
   clearBuffer();
  }
}
// 自定义可写流
let myWrite = new MyWrite;
// 第一次写入时真的往里写入 之后就需要手动清空数组的内容
myWrite.write('123','utf8',()=>{
  console.log('callback')
})
myWrite.write('456', 'utf8', () => {
  console.log('callback')
})