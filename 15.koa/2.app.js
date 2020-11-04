let app = {};
app.middlewares = [];
app.use = function (cb) {
  app.middlewares.push(cb);
}
app.use((next) => {
  console.log('1');
  next();
  console.log('2');
});
app.use((next) => {
  console.log('3');
 next();
  console.log('4');
});
app.use((next) => {
  console.log('5');
  next();
  console.log('6');
});
let fn = app.middlewares.reduce((a,b)=>(...args)=> a(() => b(...args)));
fn(()=>{});
// redux compose 组合方法 reduceRight  
// let fn = app.middlewares.reduceRight((a,b)=>()=>b(a),()=>{});
// fn();
// function dispatch(index) {
//   if(index === app.middlewares.length)  return ()=>{}
//   let route = app.middlewares[index]; // 第一次的中间件
//   route(() => dispatch(index+1));
// }
// dispatch(0);