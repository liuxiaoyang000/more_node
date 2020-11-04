class Layer {
  constructor(path,cb){
    this.path = path;
    this.cb = cb;
  }
}
class Router {
  constructor(){
    this.arr = [];
  }
  get(pathname,callback){
    this.arr.push(new Layer(pathname, callback))
  }
  compose(ctx,arr,next){
    function dispatch(index) {
      if(index === arr.length) return next();
      let route = arr[index];
      route(ctx,()=>dispatch(index+1));
    }
    dispatch(0);
  }
  routes(){
    return async(ctx,next)=>{
      let p = ctx.path;
      let arr = this.arr.filter(r => r.path === p);
      arr = arr.map(r=>r.cb); // 当前匹配到的方法
      // 先执行路由中默认的方法，最后一次调用next 其实是原生的koa的next方法
      this.compose(ctx, arr, next);      
    }
  }
}
module.exports = Router;