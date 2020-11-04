// http header 
// 虚拟主机 req.headers.host 反向代理
// 断点续传 206范围请求 Range:bytes=0-100  Content-Range:0-100/总数
// 304缓存 网站有很多的资源都是静态文件，每次访问服务器时

let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');
let crypto = require('crypto')

let server = http.createServer(function (req,res) {
  // 1.强制缓存 当客户端访问服务端时 跟客户端说下次请求别来找我了
  let {pathname} = url.parse(req.url);
  console.log(pathname);
  // 为了不受强制缓存的干扰 你可以设置永远不缓存
  //res.setHeader('Cache-Control', 'no-cache');
   res.setHeader('Cache-Control','max-age=10');
  // res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString());

  // 一般情况下 会先采用强制缓存，强制缓存使用后 再5s内不会再发送请求了，过了5s 会再次发请求


  if(pathname == '/'){
    return fs.createReadStream(path.join(__dirname,'index.html')).pipe(res);
  }
  let realPath = path.join(__dirname,pathname);
  // 最后修改时间不是很准确 这个时间 精确到秒的 ，有可能最后修改时间不同但是内容是相同的
  fs.stat(realPath,function (err,statObj) {
    if (err) return res.statusCode = 404, res.end();
    let etag = crypto.createHash('md5').update(fs.readFileSync(realPath)).digest('base64');
    res.setHeader('Etag', etag); // 一般会用文件大小来代替etag
    if(etag === req.headers['if-none-match']){
      res.statusCode = 304
      res.end();
    }else{
      fs.createReadStream(realPath).pipe(res);
    }
    // res.setHeader('Last-Modified', statObj.ctime.toGMTString());
    // let ctime = req.headers['if-modified-since'];
    // if (ctime === statObj.ctime.toGMTString()){
    //   res.statusCode = 304;
    //   res.end();
    // }else{
    //   fs.createReadStream(realPath).pipe(res);
    // }
  });
});
let port = 3000;

// 缓存304 Cache-Control Expires
// Last-Modified if-modified-since;
// Etag if-none-match

server.listen(port,function () {
  console.log(port+'start');
})
// 端口号占用 可以重启一个服务
server.on('error',function (err) {
  if (err.errno == 'EADDRINUSE'){
    server.listen(++port);
  }
})