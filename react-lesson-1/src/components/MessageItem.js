import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Consumer} from './Context.js';
export default class MessageItem extends Component {
  handleClick = ()=>{
    this.props.fn(3);
  }
  render() {
    let {title,key} = this.props.list;
    console.log(key)
    return (
      <Consumer>
        {({r})=>{
          return <li className="list-group-item">
            <h4>{title}</h4>
            <button className="btn btn-primary" onClick={this.handleClick}>点赞</button>
            <button className="btn btn-default" onClick={()=>{
              r();
            }} >取消</button>
          </li>
        }}
      </Consumer>
    )
  }
}
// 父传子 靠的是属性 
// 平级靠的是 共同的父组件
// 跨级 靠的是context api
// https://juejin.im/post/5aee7bb4f265da0b7c072b73

