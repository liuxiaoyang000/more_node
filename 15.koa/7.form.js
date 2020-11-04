let Koa = require('koa');
let app = new Koa();
let fs = require('fs');
let path = require('path');
// 当访问/的时候 执行返回index.html页面，提供一个提交方法，把表单的内容提交过来，把提交的内容显示到页面上

app.use(async (ctx,next)=>{
  if(ctx.path === '/'){
   ctx.set('Content-Type','text/html;charset=utf8');
   ctx.body =  fs.createReadStream(path.join(__dirname,'index.html'));
  }else{
    return next();
  }
});
function bodyParser(ctx) {
  return new Promise((resolve,reject)=>{
    let arr = [];
    ctx.req.on('data', function (data) {
      arr.push(data);
    });
    ctx.req.on('end', function () {
      let data = Buffer.concat(arr).toString();
      resolve(data);
    })
  })
}
// 在koa中所有的异步方法 必须封装成promise 等待这个promise执行完在继续向下执行，
// 否则koa不会等待异步执行完 直接就返回结果了
app.use(async(ctx,next)=>{
  if(ctx.path == '/login' && ctx.method === 'POST'){
    ctx.body = await bodyParser(ctx);
  }
});
// 文件上传,静态服务中间件 koa路由 ejs
app.listen(4000);