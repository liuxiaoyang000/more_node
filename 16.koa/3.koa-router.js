let Koa = require('koa');
let Router = require('./koa-router');
let app = new Koa();
// 路由 不同的请求方法和路径 会返回不同的内容
let router = new Router();
router.get('/',async (ctx,next)=>{
  ctx.body = 'home';
  next();
});
router.get('/', async (ctx, next) => {
  ctx.body = 'h1';
  next();
});
router.get('/login', async (ctx, next) => {
  ctx.body = 'login'
});
app.use(router.routes());
//app.use(router.allowedMethods()); // 405 识别当前可以服务端可以接收哪些方法
app.use(async ctx => {
  ctx.body = 'hello';
})
app.listen(3000);