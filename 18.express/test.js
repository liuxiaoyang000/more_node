let configPath = '/user/:name/:id';
//              /user/([^\/]*)/([^\/]*)
let realPath = '/user/1/2';


// {name:1,id:2};

let params = [];

let regStr = configPath.replace(/:([^\/]*)/g,function () {
  params.push(arguments[1]);
  return '([^\/]*)'
});
let reg = new RegExp(regStr);
let [,...args] = realPath.match(reg);
console.log(args);
console.log(params);

// path-to-RegExp
let memo = params.reduce((memo, key, index) => (memo[key] = args[index], memo),{});
console.log(memo)