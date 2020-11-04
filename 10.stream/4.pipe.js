let fs = require('fs');

// 假如这个文件1个G  先读取64k 往里写入 预期16k 会返回flag 为false，暂停读取，等待内容都写入后会触发drain事件，恢复读取
// let rs = fs.createReadStream('1.txt');

// let ws = fs.createWriteStream('2.txt');
// // 边读边写  不会淹没可用内存
// rs.pipe(ws);

let ReadStream = require('./ReadStream');
let WriteStream = require('./WriteStream');
let rs = new ReadStream('1.txt', { highWaterMark: 4 });
let ws = new WriteStream('2.txt', { highWaterMark: 1 });
rs.pipe(ws);


// 读取的过程 fs.createReadStream() read() 
// 方法是父类实现的 Readable接口，我们的子类会继承这个Readable接口，默认我们写子类时 会实现一个_read方法