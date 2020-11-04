// koa是一个class express源码用的es5 koa源码es6
let Koa = require('koa');
// 创建koa的实例 
let app = new Koa();
// 默认情况下请求到来时会执行第一个中间件
// 中间件函数有两个参数 第一个就是ctx!=req+res
// next 进行下一个的函数
app.use((ctx,next)=> {
 console.log('1');
  next();
  console.log('2');
});
app.use((ctx,next) => {
  console.log('3');
  next();
  console.log('4');
});
app.use((ctx, next) => {
  console.log('5');
  next();
  console.log('6');
});

let port = 3000
app.listen(port,'localhost',()=>{
  console.log(`server start ${port}`);
});