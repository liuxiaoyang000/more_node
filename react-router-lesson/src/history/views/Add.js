import React, { Component } from 'react';
export default class Add extends Component {
  input = React.createRef()
  handleClick = () => {
   let users =  JSON.parse(localStorage.getItem('users')) || [];
    users.push({ id: Math.random(), name: this.input.current.value});
   localStorage.setItem('users',JSON.stringify(users));
   this.props.history.push('/user/list');
  }
  render() {
    // 通过Route组件渲染出来的 页面 有三个属性  history,lication,match
    return (<div>
      <input type=" text" className="form-control" ref={this.input} />
      <button className="btn btn-primary" onClick={this.handleClick}>添加</button>
    </div>)
  }
}