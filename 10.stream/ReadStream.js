let EventEmitter = require('events');
let fs = require('fs');
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.start = options.start || 0;
    this.end = options.end || null;
    this.encoding = options.encoding || null;

    // 默认情况叫 非流动模式 如果你监听了on('data') 流动模式
    this.flowing = null;
    // 读取文件的位置
    this.pos = this.start; // this.pos会变
    //this.buffer = Buffer.alloc(this.highWaterMark)
    // 判断用户监听了什么事件？
    this.on('newListener', (type) => {
      if (type === 'data') {
        // 要读取数据
        this.flowing = true;
        this.open(); // 先打开
        this.read(); // 在开始读取
      }
    })
  }
  pause(){
    this.flowing = false;
  }
  resume(){
    this.flowing = true;
    this.read(); // 变成流动模式 继续读取文件即可
  }
  // 读取逻辑
  pipe(ws){
    this.on('data',(data)=>{
      let flag = ws.write(data);
      console.log(flag)
      if(!flag){
        this.pause();
      }
    });
    ws.on('drain',()=>{
      this.resume();
    })
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) { // 文件是存在的
        this.emit('error', err);
      }
      this.fd = fd; // 把文件描述符存好
      this.emit('open', fd);
    });
  }
  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read());
    }
    let buffer = Buffer.alloc(this.highWaterMark);
    // 0 1 2  3个  3
    // 3 4 5  3个  6
    // 6      1个
    let howMuchToRead = this.end ? Math.min((this.end - this.pos + 1), this.highWaterMark) : this.highWaterMark;
    if (howMuchToRead == 0) {
      this.flowing = null;
      this.emit('end');
      return this.close();
    }
    fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
      this.pos += bytesRead;
      if (bytesRead > 0) { // 读到内容了 只要读取到了内容 还要继续读取 直到读取不到内容
        this.emit('data', buffer.slice(0, bytesRead));
        if (this.flowing) { // 如果是流动模式就继续读取
          this.read();
        }
      }
    });
  }
  close() {
    fs.close(this.fd, () => {
      this.emit('close');
    });
  }
}
module.exports = ReadStream