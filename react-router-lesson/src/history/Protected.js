// 受保护的路由 

import React from 'react';
import {Redirect,Route} from 'react-router-dom';
// Component 如果登录就渲染这个组件  把其他属性变成一个对象
// 默认情况下 Route组件中应该传入的是component ={Profile}
// 如果添加功能 render={()=>{}} // render 和 component 唯一不同的是render是一个函数 他返回的结果会被进行渲染

// component render children 他们的三个区别
export default function ({component:Component,...rest}){
  return <Route {...rest} render={(props)=>{
    return localStorage.getItem('login') ? <Component {...props} /> : <Redirect to="/login"/>
  }}></Route>
}