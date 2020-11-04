
let express =require('express');

let app = express();

// 可以使用express 中间件来处理相同的逻辑 
// 中间件特点 1) 决定是否向下执行 2) 扩展req,res的属性 3)常见的权限校验
// cookie中的path是一样
// 中间都会执行

app.use(function (req, res, next) {
  let arr = [];
  req.on('data',function (data) {
    arr.push(data);
  });
  req.on('end',function () {
    req.body = require('querystring').parse(Buffer.concat(arr).toString());
    next('xxxx');// 是错误
  })
})
app.post('/login',function (req,res) {
  console.log(req.body);
});

app.post('/reg', function (req, res) {
});
// 错误处理中间件
app.use(function (error,req,res,next) { // 错误中间件 特点就是四个参数
  console.log(error);
})
app.listen(3000);

