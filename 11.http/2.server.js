let http = require('http');
//req 相当于是可以端的请求 可读流
//res 是代表稍后我要写响应 可写流
http.createServer(function (req,res) {
  // 请求的方法就是大写的
  console.log(req.method);
  console.log(req.url);// 从/后面到#前面的部分
  // 请求头都是小写的
  console.log(req.headers); // 对象
  let arr = [];
  // 如果有请求体会触发on('data')事件，如果没有请求体会触发on('end')事件，不管有没有请求体 end事件都会触发
  req.on('data',function (data) {
    arr.push(data);
  });
  req.on('end',function () {
    console.log(Buffer.concat(arr).toString());
    res.statusCode = 200;
    res.end('hello'); // 表示结束了
  })
}).listen(3000,'localhost',function () {
  console.log('3000端口启动了')
});