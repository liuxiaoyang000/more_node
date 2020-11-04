// zfpx-jw
(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;

    return module.exports;
  }
  return __webpack_require__(__webpack_require__.s = "./src\index.js");
})
  ({
    
    "./src\index.js":
      (function (module, exports, __webpack_require__) {
        eval(`// 引用文件
let str = __webpack_require__("./src\\a.js");

__webpack_require__("./src\\index.less");

console.log(str);`);
      }),
    
    "./src\a.js":
      (function (module, exports, __webpack_require__) {
        eval(`let str = __webpack_require__("./src\\main\\b.js");

module.exports = 'a' + str;`);
      }),
    
    "./src\main\b.js":
      (function (module, exports, __webpack_require__) {
        eval(`module.exports = 'b';`);
      }),
    
    "./src\index.less":
      (function (module, exports, __webpack_require__) {
        eval(`let style = document.createElement('style');
style.innerHTML = "body {\\n  background: red;\\n}\\nbody div {\\n  background: blue;\\n}\\nbody div span {\\n  background: yellow;\\n}\\n";
document.head.appendChild(style);`);
      }),
    
  });

// 1）  我们打包的结果的路径 都是相对路径 并且都是以当前项目的目录为基准
// 2） 对象的value就是当前模块对应的代码
// 3） require方法更改成__webpack_require__  ast
// 4） main/b.js => "./src/main/b.js\"
// 5) 需要获取当前的webpack.config.j's