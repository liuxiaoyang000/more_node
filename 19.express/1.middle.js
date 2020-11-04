let express = require('./express');
let app = express();
let path = require('path');
// 1.封装在req,res上进行封装
// 2.next  决定是否向下执行
// 3.可以做一些权限处理 
app.use(express.static(__dirname));
// 中间件只要开头匹配就可以匹配上
app.use(function (req,res,next) {
    console.log('1');
    next('出错了');
});
app.use( function (req, res, next) {
  console.log('2');
   next();
});
// 在所有的路由最下方加一个错误处理中间件 参数是4个
app.use(function (err,req,res,next) {
  console.log(err);
  console.log(req.path,req.query);
  res.sendFile(path.resolve(__dirname,'index.html'));
});
app.listen(3000);

// koa-static
// bodyparser cookie-parser express-session 二级路由