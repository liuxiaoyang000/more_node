let Koa = require('koa');

let app = new Koa();

let Router = require('koa-router');

let router = new Router();

router.get('/read',async ctx=>{
  ctx.body = ctx.cookies.get('name',{signed:true}) || 'cookie not found'
});
app.keys = ['hello'];
// 带签名的cookie,防止客户端进行篡改
router.get('/write', async ctx => {
  let time = new Date(Date.now() + 1000 * 100);
  // 签名 缓存的概念
  // name=zfpx  'hello'  =>   ubOdpxPy2BJpv-Lx9YQlnlWaE6k
  // 加盐
  // let crypto = require('crypto'); // node 各种摘要和加密的算法
  // let r = crypto.createHmac('sha1', 'hello').update('name=zfpx').digest('base64');
  ctx.cookies.set('name','zfpx',{
   expires:time,
   signed:true // 签名  密钥
  });
  ctx.cookies.set('age','9',{signed:true})
  ctx.body = 'write ok'
});
// cookie 和 localStorage的区别
// session 会话

app.use(router.routes());
app.use(router.allowedMethods()); // 405

app.listen(3000);


// MD5 公开的摘要算法