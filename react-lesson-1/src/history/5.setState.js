import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// 属性传入到组件中不能更改
// 如果有需要要改 把属性变成组件的状态

// 组件的数据来源 状态 (自己的) 属性(外面给的) 组件不能更改属性
class Counter extends Component {
  state = {
    count: this.props.count
  }
  handleClick = () => {
    // 为什么 放到setTimeout中 就会渲染多次？
    // setState 批量更新的操作 （ 并不是一直的批量更新 ）
    // setState 可以写成函数的形式 或者回调函数的形式 写成函数的形式 相当于下一个状态是依赖于上一个状态的
    // this.setState((prevState) => ({ count: prevState.count + 1 }));
    // this.setState((prevState) => ({ count: prevState.count + 3 }));
    // this.setState((prevState) => ({ count: prevState.count + 2 }));

    this.setState({count:this.state.count+1},()=>{
      this.setState({count:this.state.count+3},()=>{
        this.setState({ count: this.state.count +2});
      });
    });

    // this.setState({
    //   count: this.state.count + 1
    // })
    // this.setState({
    //   count: this.state.count + 3
    // })
    // this.setState({
    //   count: this.state.count + 2
    // })
  }
  render() {
    console.log('render')
    return (<div>
      {this.state.count}
      <button onClick={this.handleClick}>添加</button>
    </div>)
  }
}
ReactDOM.render(<Counter count={10} />, window.root);