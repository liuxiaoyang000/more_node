import React from 'react';
import actions from '../store/actions/counter';
// react-redux 提供了 connect方法和Provider
// 我们需要在使用redux数据的组件上 使用connect方法链接redux
// import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
class Counter extends React.Component {
  
  handleClick = () => {
    this.props.add(3);
  }
  render() {
    return (
      <>
        <p>{this.props.number}</p>
        <button onClick={this.handleClick}>点击增加</button>
      </>
    )
  }
}
// connect 方法执行两次 后返回的是一个组件
// connect方法最后一个函数的参数是原来的组件，会把 redux中的状态映射到这个组件上
// vuex = mapState mapMutations
// let mapStateToProps = (state) => { // store.getState()
//   return {
//     number: state.counter.number,
//   }
// };
// let mapDispatchToProps = (dispatch) => { // store.dipspatch
//   return {
//     add: (n) => dispatch(actions.add(n))
//   }
// }
let bindActionCreators = (actions,dispatch) => {
  let obj = {}
  for(let key in actions){
    obj[key] = (...args) => dispatch(actions[key](...args))
  }
  return obj;
}
// 如果connect 第一次执行的函数 ，如果第二个参数是对象类型 会自动内部调用bindActionCreator来实现
export default connect((state) => ({ ...state.counter }), actions)(Counter);




// state = {
//   number: store.getState().counter.number
// }
// componentWillMount() {
//   this.unsub = store.subscribe(() => {
//     this.setState({
//       number: store.getState().counter.number
//     })
//   })
// }
// componentWillUnmount() {
//   this.unsub();
// }