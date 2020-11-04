let {Transform} = require('stream');
class MyStream extends Transform{
  _transform(chunk,encoding,callback){ // 它的参数和我们_write是一样的
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}
// 把输入的内容转化成大写
let myStream = new MyStream();
process.stdin.pipe(myStream).pipe(process.stdout);
// 四种流 读 fs.createReadStream 写 fs.createWriteStream
//  双工 socket 转化 gzip

// koa express