// 就是一个函数
let express = require('./express');

// express 内置了路由中间件

let app = express();// app 是监听函数 

// 路径参数路由， 在路径中写参数 /user/:name/:id  这个路径表示 /user开头 后面名字随意但是必须得有2项 /user/1/2  =>  {name:1.id:2} =>req.params

app.get('/user/:name/:id',function (req,res) {
  res.end(JSON.stringify(req.params));
})
app.get('/',function (req,res) { // 请求 响应是原生对象
  res.end(`home`);
});
app.post('/', function (req, res) { // 请求 响应是原生对象
  res.end(`post home`);
});
app.all('*',function (req,res) {
  res.end('end');
})
app.listen(3000);