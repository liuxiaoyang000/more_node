// proxy代理

// 双向绑定 数据变化可以更新视图
let obj = {}
// Object.defineProperty不支持数组的
// 可以监控到数组的变化
let p = new Proxy(obj,{
  get(target,key){ // 第三个属性叫代理的对象一般不用
    // toString() valueOf()
    return Reflect.get(target, key);
    // return target[key]
  },
  set(target,key,value){
    if(key === 'length') return true
    return Reflect.set(target, key, value);
  }
});
p.name = 'hello'; // 可以不用必须保证属性的存在
