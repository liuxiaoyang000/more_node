let http = require('http');
let methods = require('methods');
let url = require('url');
let fs = require('fs');
let path = require('path');
function Application() {
  function app(req, res) {
    let { pathname } = url.parse(req.url, true);
    let method = req.method.toLowerCase();
    let i = 0;
    function next(err) {
      if (app.routes.length === i ) {
        return res.end(`Cannot ${method} ${pathname}`);
      }
      let layer = app.routes[i++];
      let { method: m, path, callback } = layer;
      // 方法 可能有两类 一类是中间件 另一类 普通的路由
      if (err) {
        if(m === 'middleware'){
          if ((path === '/' || path === pathname || pathname.startsWith(path + '/') )&& (callback.length === 4)) {
            return callback(err, req, res, next);
          } else {
            next(err); // 如果有错误 把错误继续带下去即可
          }
        }else{
          next(err);
        }
      } else{
        if (m === 'middleware') {
          // 中间特点会匹配路径 如果开头相同就可以执行
          if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
            return callback(req, res, next); // 把下一次的权限交给了用户
          } else {
            next();
          }
        } else {
          if (layer.params.length) { // 这个路由是路径参数
            if (path.test(pathname)) {
              // 匹配到了 说明路径已经匹配到了 
              let [, ...args] = pathname.match(path);
              req.params = layer.params.reduce((memo, key, index) => (memo[key] = args[index], memo), {});
              return callback(req, res);
            }
          }
          if (((method == m) || (m === 'all')) && ((path === pathname) || (path === '*'))) {
            return callback(req, res);
          }
          next();
        }
      }
      
    }
    next();
  }
  app.routes = []; // 存放所有请求的信息
  app.use = function (path,callback) {
    if(typeof callback != 'function'){
      callback = path;
      path = '/';
    }
    let layer = {
      method:'middleware',
      path,
      callback
    }
    app.routes.push(layer);
  };


  [...methods, 'all'].forEach(method => {
    app[method] = function (path, callback) {
      let layer = {
        method,
        path,
        callback
      }
      layer.params = []; // 存放:后面的key值的数组
      if (path.includes(':')) { // 有：号表示是一个路径参数 路由
        layer.path = new RegExp(path.replace(/:([^\/]*)/g, function () {
          layer.params.push(arguments[1]);
          return '([^\/]*)'
        }));
      }
      app.routes.push(layer);
    }
  });

  app.listen = function (...args) {
    let server = http.createServer(app);
    server.listen(...args);
  }

  //  内置的中间件
  app.use(function (req, res, next) {
    let {pathname,query } = url.parse(req.url,true);
    req.path = pathname;
    req.query = query;
    res.sendFile = function (url) {
      fs.createReadStream(url).pipe(res);
    }
    res.send = function (val) {
      if(typeof val === 'string' || Buffer.isBuffer(val)){
        res.setHeader('Content-Type','text/plain;charset=utf8');
        res.end(val);
      }else if(typeof val =='object'){
        res.setHeader('Content-Type', 'application/json;charset=utf8');
        res.end(JSON.stringify(val));
      }else if(typeof val === 'number'){
        res.statusCode = val;
        res.end(require('_http_server').STATUS_CODES[val]);
      }
    }
    next();
  })
  return app;
}
Application.static = function (pathname) {
    return function (req,res,next) {
      let realPath = path.join(pathname,req.path);
      fs.stat(realPath,function (err,statObj) {
        if(err){
          next();
        }else{
          if(statObj.isDirectory()){
            // todo;
          }else{
            res.sendFile(realPath);
          }
        }
      })
    }
}
module.exports = Application;