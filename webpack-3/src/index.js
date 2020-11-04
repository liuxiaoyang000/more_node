import React from 'react';
import ReactDOM from 'react-dom';

// 第一 先把这个模块 抽离出来react react-dom 拿出去 先打包好

ReactDOM.render(<div>hello zfpx1</div>,window.app);



// import './style.css';
// class My{
//   start(){
//     console.log('start');
//   }
// }
// let my = new My();
// my.start();
// // 生成环境 我就
// let url = '';
// if(PRODUCTION==='dev'){
//   url = 'http://www.zf.cn'
// }else{
//   url = 'http://localhost:3000'
// }
// console.log(url);