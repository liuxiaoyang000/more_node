btn.addEventListener('click', function () { 
  // Promise.all(promises)
  __webpack_require__.e(0)
    // __webpack_require__ = require   require("./src/use.js")
    .then(__webpack_require__.bind(null, "./src/use.js")) // data.default = 'hello' return data
    then(function (data) { // data
      console.log(data.default) 
    })
});

// 第一步 window["webpackJsonp"].push = webpackJsonpCallback; // 把json的回调挂再了window["webpackJsonp"].push方法上
// 第二步 调用__webpack_require__.e 告诉内部加载0.js 并且返回的是一个promise
// 第三部 再modules的属性上把 当前的0.js 放到了modules的对象内，把后加载的模块放到了modules中
// 第四部 __webpack_require__.bind(null, "./src/use.js") 引用这个use.js
// __webpack_exports__[\"default\"] = 'hello'  exports.default = 'hello';
// 第五部 下一次then 就可以拿到这个exports 对象 通过.default 拿到异步加载的结果

// 下一次实现react 懒加载  hm