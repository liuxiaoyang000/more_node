let Koa = require('koa');

let app = new Koa();

let session = require('koa-session');
let Router = require('koa-router');
app.use(session({}, app));

let router = new Router();
// 记录一下访问的次数
app.keys = ['zfpx','xxx'];
router.get('/visit',async ctx=>{
  if (ctx.session.visit){
    ctx.body = ++ctx.session.visit;
  }else{
    ctx.session.visit = 1;
    ctx.body = '第一次访问'
  }
});
// localStorage 本次存储 默认情况 永久
// sessionStorage 浏览器关了就没有了 滚动条位置
// vuex  redux 数据都是存在内存中的 -> localStorage
// 可以实现登录，登录后种植cookie 每次请求时会携带cookie
app.use(router.routes());
app.listen(3000);