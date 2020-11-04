
btn.addEventListener('click',function () {
  // 动态加载js  import(); 草案中 执行后返的是promise
  import('./use').then(data=>{
    console.log(data.default);
  })
}); 
// 实现react中怎么异步加载组件



// import './a';
// import './b';

// import jquery from 'jquery';
// console.log('index');
// import {add} from './calc'; 
// // tree shaking  必须采用import 语法 es6 
// // 前端不要使用require语法 可能会导致代码是多余的
// console.log(add('a','b'))


// // 把变量尽可能最小化
// let a = 'b';
// let b = 'c';
// let c = 'd';
// let d = a+b+c+d
// console.log(d);











// moment 时间的插件 12345676543245   YYYY-MM-DD
// 可以算相对时间  多语言

// import moment from 'moment'; 
// // 距离当前时间 过去了多久

// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

// // 用的是英文
// console.log(moment().fromNow());