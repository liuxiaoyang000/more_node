import $ from 'jquery'; // 是jquery
import './index.less'
console.log($)


// 图片的引入方式 
// 1) js中引入 
// 会把logo进行生成一张新的图片放到dist目录下，会返回一个新的图片地址
import logo from './logo.png'; // 依赖的文件会被打包
let img = new Image();
img.src = logo; // 不能放字符串
document.body.appendChild(img);


// 2) 背景图
// 3) <img src="" alt=""/> 