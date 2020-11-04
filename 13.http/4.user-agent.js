let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let whiteLists = ['localhost', '127.0.0.1']
http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url, true);
  let agent = req.headers['user-agent'];
  if (pathname === '/') {
    // 判断当前用户是 移动端 还是pc端 // 如果当前是移动端 我就跳转珠峰网址 不是跳转到百度
    if(agent.includes('iPhone')){ // 移动端
      res.statusCode = 302;
      res.setHeader('Location','http://www.zhufengpeixun.cn');
      res.end();
    }else{
      res.statusCode = 302;
      res.setHeader('Location', 'http://www.baidu.com');
      res.end();
    }
  }
}).listen(9999);