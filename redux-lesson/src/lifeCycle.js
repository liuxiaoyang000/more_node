// 生命周期 
// 记住常见的生命周期 知道每个生命周期 可以做哪些事
// 新的生命周期 

import  React from 'react';
import ReactDOM from 'react-dom';
// willMount DidMount willReceiveProps 其他的都不能调用setState
// setState 
class ChildCounter extends React.Component{
  state = {}
  // componentWillMount(){
  //   console.log('child componentWillMount')
  // }
  render(){
    console.log('child render')
    return <div>
      儿子 {this.state.a}
    </div>
  }
  componentDidMount(){
    console.log('child componentDidMount')
  }
  // componentWillReceiveProps(newProps){ // 组件接收到了新的属性 （第一次不触发）
  //   console.log('componentWillReceiveProps')
  //   // 接收到新的属性后 一般的人可能会把接收到的属性放到状态上
  //   // 建议不要调用setState 16.3 
  // }
  static getDerivedStateFromProps(newProps){
    console.log(newProps); // 没有在此方法中显示调用setState
    return {a:newProps.a}
  }
  shouldComponentUpdate(){
    console.log('child shouldComponentUpdate');
    return true
  }
}
class Counter extends React.Component{
  static defaultProps = {
    name:'zfpx'
  }
  state = {
    count:1
  }
  constructor(props){
    super();
    console.log(props)
  }
  // componentWillMount(){ // 16.3 如果使用新的api 已经不采取使用了
  //   console.log('componentWillMount');
  // }
  shouldComponentUpdate(nextProps,nextState){ // 组件是否需要更新
    // 可以做优化 (immutable  PureComponent)
    // 返回false 状态也是会更新的
    return nextState.count%2 !==0;
  }
  // componentWillUpdate(){
  //   console.log('组件将要更新')
  // }
  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log('组件将要更新 ');
    console.log(arguments);
    return {a:1}
  }
  render(){
    console.log('render')
    return <div>
      {this.state.count}
      <ChildCounter a={this.state.count}></ChildCounter>
      <button onClick={()=>{
        // 无论数据是否变化 都会重新调用render方法
        this.setState({count:this.state.count+1});
      }}>添加</button>
    </div>
  }
  componentDidUpdate(a,b,c){
    console.log('组件更新完成');
    console.log(c);
  }
  // 生命周期都是同步执行的 但是ajax 是异步的  一定会更新两次的
  componentDidMount(){ // ajax 或者 获取dom元素
 
    console.log('componentDidMount')
  }
}
ReactDOM.render(<Counter age={9}></Counter>,window.root);