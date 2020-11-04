 (function(modules) { // webpackBootstrap
   // install a JSONP callback for chunk loading
   // 安装一个jsonp callback 为了实现代码块的加载
   function webpackJsonpCallback(data) { // [0] ,{"./src/use.js",函数体}
 		var chunkIds = data[0];
 		var moreModules = data[1]; // 加载更多的模块
 		// add "moreModules" to the modules object, {'src/index',函数体}
 		// then flag all "chunkIds" as loaded and fire callback
 		var moduleId, chunkId, i = 0, resolves = [];
 		for(;i < chunkIds.length; i++) {
       chunkId = chunkIds[i];
       // {main:0,0:[resolve,reject,promise]}
 			if(installedChunks[chunkId]) { // 把resolve方法 放到数组中
 				resolves.push(installedChunks[chunkId][0]);
 			}
 			installedChunks[chunkId] = 0; // 这个模块 加载完成
 		}
 		for(moduleId in moreModules) {
 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
         // {'src/index',函数体}
        // modules["./src/use.js"] = 函数体
 				modules[moduleId] = moreModules[moduleId];
 			}
 		}
 		if(parentJsonpFunction) parentJsonpFunction(data);

 		while(resolves.length) {
 			resolves.shift()(); // 调用了promise的成功方法
 		}

 	};

 	// The module cache
 	var installedModules = {};

 	// object to store loaded and loading chunks
  // undefined = chunk not loaded,
  //  null = chunk preloaded/prefetched
  // Promise = chunk loading
  // 0 = chunk loaded
  // 已经装载的模块
  // undefined 表示模块没有加载
  // null 代码块预加载
  // Promise 表示正在加载
  // 0代表模块已经加载完了
 	var installedChunks = {
     "main": 0,
 	};

 	// script path function
 	function jsonpScriptSrc(chunkId) {
 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
 	}
 	// The require function
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}

   // This file contains only the entry chunk.
   // 默认文件只包含 入口的代码块
   // The chunk loading function for additional chunks
  // 增加加载的函数代码块
 	__webpack_require__.e = function requireEnsure(chunkId) {
 		var promises = [];

 		// JSONP chunk loading for javascript
    // 拿到chunkId= 0 的模块名
 		var installedChunkData = installedChunks[chunkId];
 		if(installedChunkData !== 0) { // 0 means "already installed". // 0表示装载
 			// a Promise means "currently loading".
 			if(installedChunkData) {
 				promises.push(installedChunkData[2]);
 			} else {
         // setup Promise in chunk cache
         // 创建promise
 				var promise = new Promise(function(resolve, reject) {
          
 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
         });
         // 
         // {0: [resolve, reject,promise]}
 				promises.push(installedChunkData[2] = promise);

 				// start chunk loading
 				var head = document.getElementsByTagName('head')[0]; // 获取head标签
 				var script = document.createElement('script'); // 创建一个script标签
 				var onScriptComplete;

 				script.charset = 'utf-8'; // 设置编码是utf
 				script.timeout = 120; // 设置超时时间
 				if (__webpack_require__.nc) {
 					script.setAttribute("nonce", __webpack_require__.nc);
 				}
 				script.src = jsonpScriptSrc(chunkId); //加载 0.js

 				onScriptComplete = function (event) {
 					// avoid mem leaks in IE. 防止内存泄漏
 					script.onerror = script.onload = null;
           clearTimeout(timeout); // 制作一个 js超时函数 如果正常加载了那就取消掉即可
           // {0:[resolve,reject,promise]}
 					var chunk = installedChunks[chunkId];
 					if(chunk !== 0) {
 						if(chunk) {
 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
 							var realSrc = event && event.target && event.target.src;
 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
 							error.type = errorType;
 							error.request = realSrc;
 							chunk[1](error);
 						}
 						installedChunks[chunkId] = undefined;
 					}
 				};
 				var timeout = setTimeout(function(){
 					onScriptComplete({ type: 'timeout', target: script });
         }, 120000);
         // 当标签加载成功 或者失败的时候 都会走这个方法
 				script.onerror = script.onload = onScriptComplete;
 				head.appendChild(script); // 把标签插入到head中
 			}
 		}
 		return Promise.all(promises);
 	};

 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	// define __esModule on exports
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
 	__webpack_require__.p = "";

 	// on error function for async loading
 	__webpack_require__.oe = function(err) { console.error(err); throw err; };

   // 这里有很多没用的逻辑 
   var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  // jsonpArray = window["webpackJsonp"] =  [].push = webpackJsonpCallback
  // [].prototype.push.bind( [])
   var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
   
  jsonpArray.push = window["webpackJsonp"] 
 	jsonpArray.push = webpackJsonpCallback;
 	jsonpArray = jsonpArray.slice();
 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
 	var parentJsonpFunction = oldJsonpFunction;
  // window["webpackJsonp"].push = webpackJsonpCallback

 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
/************************************************************************/
 ({

 "./src/index.js":
 (function(module, exports, __webpack_require__) {
eval("btn.addEventListener('click', function () {\n  // 动态加载js  import(); 草案中 执行后返的是promise\n  __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./use */ \"./src/use.js\")).then(function (data) {\n    console.log(data.default);\n  });\n}); // 实现react中怎么异步加载组件\n// import './a';\n// import './b';\n// import jquery from 'jquery';\n// console.log('index');\n// import {add} from './calc'; \n// // tree shaking  必须采用import 语法 es6 \n// // 前端不要使用require语法 可能会导致代码是多余的\n// console.log(add('a','b'))\n// // 把变量尽可能最小化\n// let a = 'b';\n// let b = 'c';\n// let c = 'd';\n// let d = a+b+c+d\n// console.log(d);\n// moment 时间的插件 12345676543245   YYYY-MM-DD\n// 可以算相对时间  多语言\n// import moment from 'moment'; \n// // 距离当前时间 过去了多久\n// import 'moment/locale/zh-cn';\n// moment.locale('zh-cn');\n// // 用的是英文\n// console.log(moment().fromNow());\n\n//# sourceURL=webpack:///./src/index.js?");
 }),
 });