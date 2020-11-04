let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');
let util = require('util');
let mime = require('mime');

let stat = util.promisify(fs.stat);
let access = util.promisify(fs.access);
let server = http.createServer(async function (req,res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  // 设置预检测时间
  res.setHeader('Access-Control-Max-Age',6000);
  if(req.method === 'OPTIONS'){
    res.end(); // options就是preflight 可以断掉此请求会继续发送put或者post请求
  }
  let {pathname} = url.parse(req.url);
  let realPath = path.join(__dirname,pathname);

  console.log(pathname);
  if(pathname === '/reg'){
    let arr = [];
    req.on('data', function (data) {
      arr.push(data);
    });
    req.on('end',function () {
      let str = Buffer.concat(arr).toString();
      if(req.headers['content-type'] === 'application/json'){
        res.end(JSON.parse(str).name);
      } else if (req.headers['content-type'] ==='application/x-www-form-urlencoded'){
        res.end(require('querystring').parse(str).name);
      }
    })
  }
  if(pathname === '/login'){
    return res.end('/login');
  }
  try{
    let statObj = await stat(realPath);
    if (statObj.isDirectory()) {
      realPath = path.join(realPath, 'index.html');
      await access(realPath);
    } 
    res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf8');
    fs.createReadStream(realPath).pipe(res);
  }catch(e){
    res.statusCode = 404;
    res.end('Not Found');
  }
});
server.listen(3000,function () {
  console.log('server start 3000');
})