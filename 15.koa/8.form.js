let Koa = require('koa');
let app = new Koa();
let fs = require('fs');
let path = require('path');
// 中间件 中间件一般是一个函数，会在use方法中的最上面使用
let convert = require('koa-convert');
let body = require('koa-better-body');

app.use(convert(body({
  uploadDir:path.join(__dirname,'upload')
}))); // 会将解析后的内容添加到ctx.request.body上
app.use(async (ctx,next)=>{
  if(ctx.path === '/'){
   ctx.set('Content-Type','text/html;charset=utf8');
   ctx.body =  fs.createReadStream(path.join(__dirname,'index.html'));
  }else{
    return next();
  }
});
app.use(async(ctx,next)=>{
  if(ctx.path == '/login' && ctx.method === 'POST'){
    // 获取请求体代码
    ctx.body = ctx.request.fields;
  }
});
app.listen(4000);



// function bodyparser() { // 中间件的固定写法
//   return async (ctx,next )=>{
//     // 1.好处：可以在ctx上下文新增属性
//     // 做一些拦截功能 next函数可以决定是否向下执行 router.beforeEach
//     await new Promise((resolve,reject)=>{
//       let arr = [];
//       ctx.req.on('data', (chunk)=>{
//         arr.push(chunk);
//       });
//       ctx.req.on('end', (params)=> {
//         let r = Buffer.concat(arr).toString();
//         if (ctx.get('Content-Type')=== 'application/x-www-form-urlencoded'){
//           ctx.request.body = require('querystring').parse(r);
//         } else if (ctx.get('Content-Type') === 'application/json'){
//           ctx.request.body = JSON.parse(r);
//         }else{
//           ctx.request.body = r
//         }
//         resolve();
//       });
//     });
//     return next();
//   }
// }