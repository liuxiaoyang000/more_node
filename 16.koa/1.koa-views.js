// 服务端渲染的页面 ejs 

let Koa = require('koa');
// 专门用来 使用 模板引擎的中间件
// let views = require('koa-views');
let app = new Koa();
let path = require('path');
let fs = require('fs');
let { promisify} = require('util');
let readFile = promisify(fs.readFile);
function views(p,opts) {
  return async (ctx,next)=>{
    ctx.render =async function (filename,data) {
      let extension = opts.map.html; 
      let ejs = require(extension); // 引用ejs
      // 读取文件内容
      let tmpStr = await readFile(path.join(p,filename),'utf8');
      ctx.set('Content-Type','text/html;charset=utf8');
      // 用数据渲染字符串,把结果返回
      ctx.body = ejs.render(tmpStr,data);
    } 
    return next(); // 如果不写await 是不是下一个中间调用后马上这个函数就执行完了 
  }
}
app.use(views(path.join(__dirname, 'views'),{
  map:{ // 按照ejs的规则来渲染
    html:'ejs'
  }
})); // 使用中间件后这个中间件会在上下文上添加一个render方法

app.use(async (ctx) => {
  await ctx.render('index.html',{name:'zfpx'}); // 这个方法返回的是promise
}); 

app.listen(3000, function () {
  console.log(`server start ` + 3000);
});