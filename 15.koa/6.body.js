let Koa = require('koa');
let app = new Koa();
app.use(()=>{
  throw new Error();
})
app.on('error',function (err) {
    console.log(err);
})
app.listen(3000);