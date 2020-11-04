let url = '/user/:id/:name'; // 配置的路径 
let str = '/user/1/2';  // 请求的路径

let pathToRegExp = require('path-to-regexp');
let keys = []
let reg = pathToRegExp(url, keys,{end:true});
keys = keys.map(k => k.name);
console.log(keys);
let [,...args] = (str.match(reg))
console.log(args);

let r = keys.reduce((memo,key,index)=>(memo[key]=args[index],memo),{});
console.log(r);