// koa-static 静态服务中间件

// localhost:3000/index.js
// localhost:3000/index.html

// localhost:3000/login
// 在某一个地方统一处理下，看看这个路径是否存在 如果存在就把文件返回
let Koa = require('koa');
let path = require('path');
// let Serve = require('koa-static');
let fs = require('mz/fs');
let app = new Koa();
function Serve(dirname) {
  return async (ctx,next)=>{
    let realPath = path.join(dirname, ctx.path);
    try{
      let statObj = await fs.stat(realPath);
      if (statObj.isFile()) {
        ctx.body = fs.createReadStream(realPath);
      } else {
        realPath = path.join(realPath,'index.html');
        await fs.access(realPath);
        ctx.body = fs.createReadStream(realPath);
      }
    }catch(e){
      await next();
    }
  }
}
app.use(Serve(path.join(__dirname, 'views')));
app.use(async ctx=>{
  ctx.body = 'hello';
});

app.listen(3000,function () {
  console.log(3000);
});