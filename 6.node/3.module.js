let path = require('path');
let fs = require('fs');
function Module(id) {
  this.id = id;
  this.exports = {};
}
Module._extensions = {
  '.js'() { // 编译js的方法
  },
  '.json'(module) {
    module.exports = JSON.parse(fs.readFileSync(module.id,'utf8'));
  }
};
// 解析文件的绝对路径
Module._resolveFilename = function (filename) {
  let r = path.resolve(__dirname, filename);
  // 如果当前的路径 没有扩展名 就依次添加扩展名尝试
  if (!path.extname(r)) {
      let extnames = Object.keys(Module._extensions); // ['js','json']
      for (let i = 0; i < extnames.length; i++) {
        let p = r + extnames[i];
        try {
          fs.accessSync(p); // 在这里判断这个路径ok不ok
          return p; //这个路径就是我想要的路径 
        } catch (e) {
          
        }
      }
  }
}
Module._load = function (filename) { // 当前需要引用的扩展名
  let asbPath = Module._resolveFilename(filename);
  // 创建模块
  let module = new Module(asbPath);
  // 加载模块
  let ext = path.extname(module.id);
  Module._extensions[ext](module); // 这个方法调用完后module.exports 就有了结果
  return module.exports
}
function req(id) {
  return Module._load(id);
}
//1.拿到用户传入的路径 将路径解析成绝对路径，创建一个模块，根据路径加载对应的方法，如果是json把读取的结果放到模块的exports对象上，req方法最后返回这个exports对象
//2.模块加载的作业js如何实现 作业
//https://juejin.im/post/5b966d1ff265da0ae800f8ca


let r = req('./user'); // 会先找js 在找json
console.log(r);
// 先实现一个require方法
// Module._load 加载模块
// Module._resolveFilename 解析文件 把相对路径解析成绝对路径，会添加后缀
// 是否有缓存 有缓存就把exports对象返回回去
// new Module 创建一个模块
// 每一个模块上都有一个id代表的是当前的绝对路径 还有一个exports对象
// Module._cache 是用来缓存模块的 缓存的key是绝对路径
// module.load 加载模块
// Module._extensions 模块上扩展名的对象
// module.export (this)  exports require module


一篇文章搞定前端面试 https://juejin.im/post/5bbaa549e51d450e827b6b13?utm_source=gold_browser_extension
 近期大厂面试题 https://github.com/Liyuk/Interview-Questions-Answers 记录面试中一些回答不够好的题 https://juejin.im/post/5a9b8417518825558251ce15?utm_source=gold_browser_extension 2018前端常见题汇总，不定时更新 https://github.com/qianbin01/frontend_train 百度阿里网易大疆等大小厂前端校招面筋 | 掘金技术征文 https://juejin.im/post/5bb470295188255c5e66f88f?utm_source=gold_browser_extension 2018前端面试总结，看完弄懂，工资少说加3K | 掘金技术征文 https://juejin.im/post/5b94d8965188255c5a0cdc02?utm_source=gold_browser_extension 2万5千字大厂面经 | 掘金技术征文 https://juejin.im/post/5ba34e54e51d450e5162789b?utm_source=gold_browser_extension





const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
});



resolve,reject 是否是原型上的
static静态方法