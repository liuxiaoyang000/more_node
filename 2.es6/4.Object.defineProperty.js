let obj = {};
// 我希望用户只要获取PI 就打印哈哈
// 用户如果改了PI的值 我就打印呵呵
// class的实现 vue MVVM mobx 装饰器 koa
let temp = 3.15
Object.defineProperty(obj,'PI',{
  enumerable:true,
  // writable:true, // 不能重新赋值如果为false
  get(){
    console.log('哈哈');
    return temp
  },
  set(val){
    console.log('呵呵');
    temp = val;
  },
  configurable:true
})
obj.PI = 4;
console.log(obj.PI);



let obj = {
  temp:'',
  get PI(){
    return this.temp
  },
  set PI(val){
    this.temp = val;
  }
}
obj.PI =100;
console.log(obj.PI)

