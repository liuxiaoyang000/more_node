let http = require('http');
let server = http.createServer();
let path = require('path');
let fs = require('fs');
let mime = require('mime');

// 创建服务后，回调的方式，当请求到来时才会执行此方法
// 会把请求过来的信息 socket = > req+res,分配好后触发一个request方法

let url = require('url');// node处理路径的
server.on('request', function (req, res) {
  let {pathname} = url.parse(req.url);
  // pathname /1.css  /ajax.html
  let realPath = path.join(__dirname, pathname);
  fs.access(realPath,function (err) {
    if(err){ // 这个文件不存在
      if (pathname === '/login') { // 当前是登录  username="123"
        let arr = [];
        req.on('data', function (data) {
          arr.push(data);
        });
        req.on('end', function () {
          let str = Buffer.concat(arr).toString();
          let obj = require('querystring').parse(str);
          res.setHeader('Content-Type', 'application/json;charset=utf8');
          res.end(JSON.stringify(obj)); // string || buffer
        });
      }else{
        res.statusCode = 404;
        res.end('Not Found');
      }
    }else{
      // 如果文件存在 不要马上去读 有可能是一个文件夹
      fs.stat(realPath,function (err,statObj) {
        if(statObj.isFile()){
          res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf8');
          fs.createReadStream(realPath).pipe(res);
        }else{
          let r = path.join(realPath,'index.html');
          fs.access(r,function (err) {
            if(err){
              res.statusCode = 404;
              res.end('not found');
            }else{
              res.setHeader('Content-Type', 'text/html;charset=utf8');
              fs.createReadStream(r).pipe(res);
            }
          })
        }
      });
    }
  })
}).listen(3000, function () {
  console.log('server start 3000');
});



// ajax请求 返回对应的结果 
// 断点续传  防盗链  多语言 缓存 虚拟主机  koa  express
// let reg = /([^=&]*)=([^=&]*)/g;
// let obj = {}
// // username=123&password=456
// str.replace(reg,function () {
//   obj[arguments[1]] = arguments[2];
// });

// let { pathname, query } = url.parse('http://username:password@www.baidu.com:8080/s?a=1', true);
// console.log(pathname, query);