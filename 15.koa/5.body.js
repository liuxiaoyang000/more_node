let Koa = require('./koa/application');
let app = new Koa();
let fs = require('fs');
let path = require('path');
app.use(async (ctx,next)=>{
  ctx.body = 'zfpx';
  return next()
 // ctx.body = fs.createReadStream(path.join(__dirname,'index.html'))
});
app.use(async (ctx, next) => {
  ctx.body = 'zfpx';
  throw new Error('xxx');
  // ctx.body = fs.createReadStream(path.join(__dirname,'index.html'))
});
app.on('error',function (e) {
  console.log('xxx',e)
});
app.listen(3000, 'localhost', () => {
  console.log(`server start 3000`);
})