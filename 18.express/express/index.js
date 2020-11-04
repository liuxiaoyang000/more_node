let http = require('http');
let methods = require('methods');
let url = require('url');
function Application() {
  function app(req, res) {
    let { pathname } = url.parse(req.url, true);
    let method = req.method.toLowerCase();

    for (let i = 0; i < app.routes.length; i++) {
      let layer = app.routes[i];
      let { method: m, path, callback } = layer;
      if (layer.params.length) { // 这个路由是路径参数
        if (path.test(pathname)) {
          // 匹配到了 说明路径已经匹配到了 
          let [, ...args] = pathname.match(path);
          req.params = layer.params.reduce((memo,key,index)=>(memo[key]=args[index],memo),{});
          return callback(req,res);
        }
      }
      if (((method == m) || (m === 'all')) && ((path === pathname) || (path === '*'))) {
        return callback(req, res);
      }
    }
    res.end(`Cannot ${method} ${pathname}`);
  }
  app.routes = []; // 存放所有请求的信息
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
  return app;
}

module.exports = Application;