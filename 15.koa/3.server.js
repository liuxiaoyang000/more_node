let Koa = require('./koa/application');
let app = new Koa();
// ctx上有req属性 req属性就是原生的req
// cttx 上有 request属性 和 response 属性 是自己封装的 
app.use((ctx)=>{
  console.log(ctx.req.path);
  console.log(ctx.request.req.path);
  console.log(ctx.request.path);
  console.log(ctx.path); // 做了一层拦截 当我在ctx上取值 ，会去ctx.request上取值
  ctx.response.body = 'hello';
})
app.listen(3000,'localhost',()=>{
  console.log(`server start 3000`);
})