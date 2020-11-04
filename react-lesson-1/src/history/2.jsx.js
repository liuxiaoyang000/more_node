import React from 'react';
import ReactDOM from 'react-dom';

// jsx  是可以包含js的语法  与html的写法是有一些区别的
// 1) 如果渲染两个相邻的jsx元素 需要被外面的一个标签所包裹 <></>
// 2) 行内样式的写法, jsx为了识别是html还是js 需要用 < { 来区分
// 3) {} 表示的是写js  三元表达式，取值 ，(只要内容有返回值就可以显示)
// 4) 属性的名字有变化  htmlFor => for className=> class;
// 5) v-html 把内容当成html 插入到页面中
// 6) 注释只能写js注释

let str = '<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png">'
let fn = function(){
  return <span>你好</span>
}
let ele = (
  <>
    <h1 style={{background:'red'}}>标题</h1>
    <p>内容 {fn()} 
     {1==1?<span>对的</span>:<span>错的</span>}
     {JSON.stringify({name:'zfpx'})}
    </p>
    <div className="box">盒子</div>
    <label htmlFor="username">用户名</label>
    <input type="text" id="username"/>
    {/*当前是一个危险的操作 */}
    <div dangerouslySetInnerHTML={{__html:str}}></div>
  </>
)
// 列表的渲染 map 有返回值， 数组可以直接渲染到页面上
// 循环谁 就在谁的身上起key值
let arr = ['吃饭','喝水','睡觉'];
let newArr = arr.map((item,key)=>(<li key={key}>{item}</li>));

let obj = (
  <ul>
    {newArr}
  </ul>
)

// jsx元素可以进行嵌套
// 封装功能 函数  组件
ReactDOM.render(obj,window.root)