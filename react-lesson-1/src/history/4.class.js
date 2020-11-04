import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
// 实现一个类  父类提供了一个更改自己的状态的方法

//React.Component 是父类 提供了 例如setState
// 生命周期 钩子函数  回调函数
// jsx元素事件 所有的属性都是 onXxxx
class Clock extends Component {
  // constructor(props){
  //   super(props); // Component.call(this)
  //   this.state = {}// this.state 这个名字是死的
  // }
  state = { // es7
    date: new Date().toLocaleString()
  }
  componentDidMount() { // 这里可以获取dom元素，组件已经挂载完成了
    this.timer = setInterval(() => {
      this.setState({
        date: new Date().toLocaleString()
      }); // 调用setState 就会更新视图 
    }, 1000)
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  // 常见的绑定this的方法有 1) bind 2) 箭头函数 3) es7 绑定方式
  handleClick = () => { // es7
    ReactDOM.unmountComponentAtNode(window.root);
  }
  render() {
    return <h1>时间是: {this.state.date} <button onClick={this.handleClick}>点击删除</button></h1>
  }
}


render(<Clock a="1"></Clock>, window.root)

// class A {
//   fn(){
//     console.log(this);
//   }
// }
// let a = new A();
// let fn = a.fn;
// fn();
