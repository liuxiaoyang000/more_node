let EventEmitter = require('events');
let fs = require('fs');
class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || 'w';
    this.encoding = options.encoding || 'utf8';
    this.autoClose = options.autoClose || true;
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.start = options.start || 0;

    // 如果多从调用write方法 我需要将 其他的放到队列中
    this.cache = [];
    // 当前是否需要触发这个drain事件
    this.needDrain = false;
    // 记录一下写入的个数
    this.len = 0;
    // 维护一个写入的位置
    this.pos = this.start;
    // 标识用户是否正在写入
    this.writing = false;
    // 打开文件 等待用户调用write方法
    this.open();
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.emit('error', err);
      }
      this.fd = fd;
      this.emit('open', fd);
    })
  }
  // 数据  编码  写入完成后的回调
  write(chunk, encoding = this.encoding, callback) {
    // 为了保证chunk数据是buffer类型
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length;
    let flag = (this.len >= this.highWaterMark);
    if (flag) { // 已经超过预期 需要触发drain事件
      this.needDrain = true;
    }
    // 用户调用write方法第一次是真的往里写 之后都要存起来
    if (this.writing) {
      this.cache.push({
        chunk,
        encoding,
        callback
      });
    } else {
      // 真正的把内容写入到文件里
      this.writing = true;
      // 当第一个内容 写入完成后 调用此回调清空数组中的方法
      this._write(chunk, encoding, () => this.clearBuffer()); // 实现这个方法
      // 每次写入后 需要把写入的个数减少
    }
    return this.len < this.highWaterMark
  }
  clearBuffer() {
    let obj = this.cache.shift();
    if (obj) { // 缓存有东西
      this._write(obj.chunk, obj.encoding, () => this.clearBuffer())
    } else { // 缓存区空了
      if (this.needDrain) {
        this.writing = false; // 缓存区干了下一次再写入的时候应该写入到文件中
        this.needDrain = false; // 下次再写入时 要重新触发drain事件
        this.emit('drain');
      }
    }
  }
  _write(chunk, encoding, callback) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, callback));
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, written) => {
      // written就是当前写入的个数
      // 每次调用write方法时 都记录着当前缓存区的总大小，每次写入完成后还需要将缓存区减少
      this.len -= written;
      this.pos += written;
      callback(); // 清空数组下一项
    });
  }
}
// http 
module.exports = WriteStream