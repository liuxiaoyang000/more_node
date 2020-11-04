(function (modules) {
  var installedModules = {};
  // webpack 为你实现的require方法
  function require(moduleId) { // 默认允许index.js
    if (installedModules[moduleId]) { // 缓存 cache
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false, // 模块是否加载完成
      exports: {} // 每个模块都有一个exports对象
    };
    modules[moduleId].call(module.exports, module, module.exports, require);
    module.l = true;
    return module.exports;
  }
  // commonjs规范
  return require( "./src/index.js");
})
  ({

    "./src/a.js":
      (function (module, exports) {
        eval("module.exports = 'zfpx';");

      }),
    "./src/index.js":
      (function (module, exports, require) {
        eval("let str = require(\"./src/a.js\");\r\nconsole.log(str);");
      })
  });