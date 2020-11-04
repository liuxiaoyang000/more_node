import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
function reducer(state={number:0},action){
  switch(action.type){
    case 'ADD':
    return {number:state.number+action.v}
  }
  return state;
}
let store = createStore(reducer)
window.store = store;

// 在组件中 使用redux  先把store.state 变成组件自己的状态，当状态更新时 需要更新组件自己的状态

// 周五 会讲 react-redux  (contextApi)  高阶组件
class Counter extends React.Component{
  state = {
    number:store.getState().number
  }
  componentDidMount(){
    this.unsub = store.subscribe(()=>{
      this.setState({number:store.getState().number});
    });
  }
  componentWillUnmount(){
    this.unsub();
  }
  render(){
    return <div>
      {this.state.number}
      <button onClick={()=>{
        store.dispatch({type:'ADD',v:1});
      }}>+</button>
    </div>
  }
}
ReactDOM.render(<Counter/>,window.root)