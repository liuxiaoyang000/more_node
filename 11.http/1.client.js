// node中核心模块 http模块 专门用来创建http服务的
let http = require('http');
// http.get 他只能发送get请求（没有请求体）
// 爬虫 
// post localhost:3000/path
let client = http.request({
  host:'localhost',
  method:'post',
  port:3000,
  path:'/user?a=1&b=2#hash',
  headers:{
    name:'zfpx',
    'Content-Type':'application/x-www-form-urlencoded'
  }
},function (res) {
  res.on('data',function (data) {
    console.log(data.toString(),'xxx');
  })
});
// 请求体
client.end('age=9');
