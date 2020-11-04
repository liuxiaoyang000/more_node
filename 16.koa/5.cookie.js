// localStorage sessionStorage cookie session 的区别
// localStorage 5M sessionStorage 浏览器关掉就清空了
// localStorage 不能跨域
// cookie 每次请求都可易携带（同域） withCredentials
// 不能跨域设置cookie
// http请求是无状态的
// cookie不安全 容易倍篡改 不会再cookie中存放敏感信息

let http = require('http');

http.createServer(function (req, res) {
  let arr = [];
  res.set = function (key, value, opts = {}) {
    let args = [];
    if (opts.path) {
      args.push(`path=${opts.path}`);
    }
    if (opts.maxAge) {
      args.push(`max-age=${opts.maxAge}`);
    }
    arr.push(`${key}=${value}; ${args.join('; ')}`);
    res.setHeader('Set-Cookie', arr);

  }

  res.get = function (key) {
    let r = require('querystring').parse(req.headers['cookie'], '; ');
    return r[key];
  }
  if (req.url === '/read') { // 读取cookie
    res.end(res.get('age'))
  }
  if (req.url === '/write') { // 设置cookie
    res.set('name', 'zfpx', { path: '/', maxAge: 20 });
    res.set('age', 9);
    // res.setHeader('Set-Cookie', [`name=zfpx; path=/; Max-Age=20; httpOnly`,'age=9']);
    res.end('write ok');
  }
}).listen(4000);
