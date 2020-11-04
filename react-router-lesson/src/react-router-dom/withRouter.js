import React from 'react';
import Route from './Route'
export default function (Component) {
  return ()=>{
    // 把原来的组件用Route组件进行包装即可
    return <Route component={Component}/>
  }
}