let Koa = require('koa');
let fs = require('fs');
let path = require('path');
let app = new Koa();
let body = require('koa-better-body');
let convert = require('koa-convert');
app.use(convert(body({
  uploadDir:path.join(__dirname,'upload')
})));
app.use(async (ctx,next)=> {
  if(ctx.path == '/'){
    ctx.set('Content-Type','text/html;charset=utf8');
    ctx.body = fs.createReadStream(path.join(__dirname,'./formData.html'));
  }else{
    await next();
  }
})
app.use(async (ctx, next) => {
  if (ctx.path == '/upload') {
    ctx.body = ctx.request.fields;
  } 
})
app.listen(5000);