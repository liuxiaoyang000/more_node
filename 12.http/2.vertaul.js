// 我们一个服务器上写两个网站
// 
// www.zf3.cn  =>    3000
// www.zf4.cn  =>   4000
let map = {
  "www.zf4.cn":'http://localhost:4000',
  "www.zf3.cn": 'http://localhost:3000'
}
let http = require('http');
let httpProxy = require('http-proxy');
// http-proxy  
// 反向代理
let proxy = httpProxy.createProxyServer();
http.createServer(function (req, res) {
  let host = req.headers['host'];
  proxy.web(req,res,{
    target: map[host]
  })
}).listen(80);