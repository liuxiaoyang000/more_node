let Koa = require('koa');
let app = new Koa();
let fs = require('fs');
let path = require('path');
let uuid = require('uuid');

Buffer.prototype.split = function (sep) {
  let len = Buffer.from(sep).length;
  let arr = [];
  let index = 0;
  let pos = 0; // indexOf;
  while (-1 != (pos=this.indexOf(sep,index))) {
    arr.push(this.slice(index,pos));
    index = pos + len;
  }
  arr.push(this.slice(index));
  return arr;
}

// 中间件 中间件一般是一个函数，会在use方法中的最上面使用
function body({uploadDir=__dirname}) {
  return async (ctx,next)=>{ 
    await new Promise((resolve,reject)=>{
      let arr = [];
      ctx.req.on('data',function (chunk) {
        arr.push(chunk);
      });
      ctx.req.on('end',function () {
        let r = Buffer.concat(arr);
        let boundary = ctx.get('Content-Type');
        boundary = '--'+boundary.split('=')[1];
        let lines = r.split(boundary).slice(1,-1); // 一共三行
        let fields = {};
        lines.forEach(line=>{
          let [head,body] = line.split('\r\n\r\n');
          head = head.toString(); // 每一个字段的头信息
          if(head.includes('filename')){
            // content就是整个内容区
            let content = line.slice(head.length+4,-2);
            let readlPath = path.join(uploadDir,uuid.v4());
            fs.writeFileSync(readlPath, content ,'utf8');
            let filename = head.match(/filename="(\S*)"/)[1];
            let name = head.match(/name="(\S*)"/)[1];
            fields[name] = {
              name: filename,
              size:content.length,
              upload: readlPath
            } 
          }else{ // 普通的文本
            let key = head.match(/name="(\S*)"/)[1]
            fields[key] = body.toString().slice(0,-2);
          }
          ctx.request.fields = fields; // 把解析后的结果放到request属性上
        })
        resolve();
      });
    });
    await next();
  }
}

app.use(body({
  uploadDir:path.join(__dirname,'upload')
})); // 会将解析后的内容添加到ctx.request.body上
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

// 实现一个可以解析任何请求体的方法 json form 文件上传 ... 文本 xml

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