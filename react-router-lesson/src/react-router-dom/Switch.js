import React, { Component } from 'react';
import { Consumer } from './context';
import pathToRegExp from 'path-to-regexp'
// 拿到其中的所有的route 判断 路径是否匹配到 如果匹配到了，不要再匹配了
export default class Switch extends Component {
  render() {
    return <Consumer>
      {(value)=>{
        let {location:{pathname}} = value;
        let children = this.props.children;
        for(let i = 0;i<children.length;i++){
          let child = children[i];
          let {path='/',exact=false,component:Component} = child.props;
          let reg = pathToRegExp(path, [], { end: exact});
          if (reg.test(pathname)){
            return child; // 如果匹配到了 把这个元素返回 
          }
        }
        return null
      }}
    </Consumer>
  }
}