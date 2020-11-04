// 主要的逻辑
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('mz/fs');
let zlib = require('zlib');
// 第三方的模块
let mime = require('mime');
let ejs = require('ejs'); // ejs jade handlebar
let chalk = require('chalk'); // 粉笔
let debug = require('debug')('dev');// DEBUG
let { readFileSync } = require('fs');
let tmpl = readFileSync(path.join(__dirname, 'template.html'), 'utf8');
class Server {
  constructor(config) {
    this.config = config;
    this.tmpl = tmpl; // 读取的模板
  }
  async handleRequest(req, res) {
    let { dir } = this.config;
    let { pathname } = url.parse(req.url);
    let realPath = decodeURIComponent(path.join(dir, pathname));
    try {
      let statObj = await fs.stat(realPath);
      // 启动服务后默认把当前文件夹的内容 展现给用户
      // 先看当前访问的路径是不是个文件夹，如果是文件夹找index.html
      // 没有index.html 返回读取目录的结果，
      // 如果是文件直接显示即可
      if (statObj.isDirectory()) {
        let html = path.join(realPath, 'index.html');
        try {
          await fs.access(html);
          this.sendFile(req, res, null, html);
        } catch (e) {
          let dirs = await fs.readdir(realPath);
          let renderStr = ejs.render(this.tmpl, {
            dirs: dirs.map(item => ({
              n: item, // 路径的名字
              path: path.join(pathname, item)
            }))
          });
          res.setHeader('Content-Type', 'text/html;charset=utf8');
          res.end(renderStr);
        }
      } else { // 如果是文件直接发送即可
        this.sendFile(req, res, statObj, realPath);
      }
    } catch (e) {
      debug(e);
      this.sendError(req, res, e);
    }
  }
  sendFile(req, res, statObj, realPath) {
    // 缓存 304  强制缓存 + 对比缓存
    // 206 范围请求   range的实现
    res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf8');
    let gzip;
    if (gzip = this.gzip(req,res)){
      fs.createReadStream(realPath).pipe(gzip).pipe(res);
      return
    }
    fs.createReadStream(realPath).pipe(res);
  }
  gzip(req,res){
    let gzip = req.headers['accept-encoding'];
    if(gzip){ // 返回一个压缩流  转化流
      // gzip, deflate
      if(gzip.match(/\bgzip\b/)){ // 支持gzip格式压缩
        res.setHeader('Content-Encoding','gzip');
        return zlib.createGzip();
      } else if (gzip.match(/\bdeflate\b/)){
        res.setHeader('Content-Encoding', 'deflate');
        return zlib.createDeflate();
      }
    }else{
      return false
    }
  }
  sendError(req, res, e) {
    debug(JSON.stringify(e));
    res.statusCode = 404;
    res.end(`Not Found`);
  }
  start() {
    // 就是开启一个服务
    let server = http.createServer(this.handleRequest.bind(this));
    let { port, host } = this.config;
    server.listen(port, host, () => {
      debug(`http://${host}:${chalk.red(port)} server start`);
    });
  }
}
module.exports = Server