let {Duplex} = require('stream');
class MyStream extends Duplex{
  _write(chunk,encoding,clearBuffer){ // 可以重写_read方法 来实现自己的逻辑
    console.log(chunk);
    clearBuffer();
  }
  _read(){
    this.push('123');
    this.push(null);
  }
}
let myStream = new MyStream();
// 双工流 http req 可读流  res 可写流
// 双工流中的read方法和write方法可以没有关系
myStream.on('data', function (data) { // socket
  console.log(data);
});
myStream.write('-----');
