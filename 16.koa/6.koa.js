// localStorage sessionStorage cookie session 的区别
// localStorage 5M sessionStorage 浏览器关掉就清空了
// localStorage 不能跨域
// cookie 每次请求都可易携带（同域） withCredentials
// 不能跨域设置cookie
// http请求是无状态的
// cookie不安全 容易倍篡改 不会再cookie中存放敏感信息
let Koa = require('koa');
// cookie + session + express;
let app = new Koa();
let Router = require('koa-router');
let router = new Router();
router.get('/read',async ctx=>{
  ctx.body = ctx.cookies.get('name') || 'cookie not found';
})
router.get('/write',async ctx=>{
  ctx.cookies.set('name','zfpx',{httpOnly:true});
  ctx.body = 'write ok'
})
app.use(router.routes());
app.listen(5000);

// jwt token  
// username  password  token