// vue双向数据绑定
let obj = {name:{name:'zfpx'},age:9};
function update() {
  console.log('数据更新了')
}
function observer(obj) {
  if(typeof obj != 'object'){
    return obj; // 普通值不需要观察
  }
  for(let key in obj){
    defineReactive(obj, key,obj[key]);
  }
}
//把对象中的所有属性都采用Object.defineProperty方式来定义
function defineReactive(obj,key,value) {
  observer(value);
  Object.defineProperty(obj,key,{
    get(){
      return value;
    },
    set(val){
      update();
      if(value!=val)value = val
    }
  });
}
observer(obj);
obj.name.name = 'zfpx1';
// proxy 代理 es6语法  mobx observer