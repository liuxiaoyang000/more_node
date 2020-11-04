// 导入的React名字必须大写
// import React from 'react';// es6 语法 导入模块

// import {render} from 'react-dom';

// jsx语法 javascript  +  html (html加js的混写)

let React = {
  createElement(type,props,...children){
    return {
      type,props,children
    }
  }
}

let h1 = <h1 id="hello">hello world <span>你好</span></h1>; // 他会用babel 进行转化 转化成 React.createElement()写法  是语法糖

// jsx -> React.createElement() -> vnode (对象 对象可以描述当前元素) -> 渲染到页面上

let render = (vnode,container)=>{
  if(typeof vnode == 'string') return container.appendChild(document.createTextNode(vnode));
  let {type,props,children} = vnode;
  let ele = document.createElement(type);
  for(let key in props){
    ele.setAttribute(key,props[key]);
  }
  children.forEach((child)=>{
    render(child,ele); // 递归渲染
  })
  container.appendChild(ele);
}
render(h1,window.root);