let Koa = require('koa');
let Router = require('koa-router');
let app = new Koa();
let router = new Router();
// 关于用户 /user  login  reg
// 个人中心 /profile update add

let userRouter = new Router();
userRouter.get('/login', ctx => {
  ctx.body = 'login'
})
userRouter.get('/reg', ctx => {
  ctx.body = 'reg'
})
let profileRouter = new Router();
profileRouter.get('/update', ctx => {
  ctx.body = 'update'
})
profileRouter.get('/add', ctx => {
  ctx.body = 'add'
})
router.use('/user',userRouter.routes());
router.use('/profile', profileRouter.routes());
app.use(router.routes()); // 装载一级路由 

app.listen(3000);