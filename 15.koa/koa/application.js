let EventEmitter = require('events');
let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let Stream = require('stream');
class Application extends EventEmitter{
  constructor(){
    super();
    this.middlewares = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  createContext(req,res){
    let ctx = this.context;
    ctx.request = this.request; // 是koa内部自己封装的
    ctx.response = this.response;
    ctx.req = ctx.request.req = req; // ctx.req res是默认的请求和响应
    ctx.res = ctx.response.res = res;
    return ctx;
  }
  // 处理当前的请求的方法
  compose(ctx,middlewares){ // 处理了promise的逻辑
    function dispatch(index) {
      if(index === middlewares.length) return Promise.resolve();
      let middleware = middlewares[index];
      return Promise.resolve(middleware(ctx,()=>dispatch(index+1)))
    }
    return dispatch(0);
  }
  handleRequest(req,res){
    // 先要创建一个context对象
    let ctx = this.createContext(req,res);
    // 要把所有的中间件进行组合
    res.statusCode = 404;
    // res.setHeader('Content-Disposition', 'attachment');
    let p = this.compose(ctx,this.middlewares);
    // 我希望等待所有中间件执行完后 在取出ctx.body把结果响应回去
    p.then(function () {
      let body = ctx.body;
      if (body instanceof Stream) { // 先判断流，在判断是不是对象
        body.pipe(res); // 异步方法
      }else if(typeof(body) === 'number'){
        res.setHeader('Content-Type', 'text/plain;charset=utf8');
        res.end(body.toString());
      }else if(typeof body == 'object'){
        res.setHeader('Content-Type','application/json;charset=utf8');
        res.end(JSON.stringify(body));
      }else if(typeof body === 'string' || Buffer.isBuffer(body)){
        res.setHeader('Content-Type', 'text/plain;charset=utf8');
        res.end(body);
      }else{
        res.end(`Not Found`);
      }
    }).catch(e=>{
      this.emit('error',e);
    });
  }
  // 中间件方法 用来收集中间件的
  use(callback){
    this.middlewares.push(callback);
  }
  // 创建服务并监听端口号
  listen(...args){
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}
module.exports = Application;