// 组件的特点 和 好处
// 方便复用 ， 方便维护，和管理 

// react中 函数就是一个组件(组件名 必须大写) ,和jsx元素 react元素 来进行区分,
// react看到大写的就知道这个是组件 小写的就是jsx元素

//  组件的分类  函数型组件  类组件
// 函数组件 1) 没有this指向 2) 没有生命周期  3) 没有状态

// 所有组件都有属性 (使用的人 可以提供这些属性)
import React from 'react';
import ReactDOM from 'react-dom';
function Clock(props) {
  return <h1>当前时间 {props.date.toLocaleString()}</h1>
}
// 可以和jsx元素 混用
setInterval(function () {
  // 默认render方法 只更新变化的地方
  ReactDOM.render(<div>
    时钟"
    <Clock date={new Date()}></Clock>
    <Clock date={new Date()}></Clock>
  </div>, window.root);
}, 1000)





