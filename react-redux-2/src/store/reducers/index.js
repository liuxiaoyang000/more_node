import counter from './counter';
import todo from './todo';
// combineReducers 是把两个状态合并成一个 并且把reducer也变成一个
// import {combineReducers} from 'redux'

// 需要把每个reducer都执行 把结果放到一个新的对象上 
function combineReducers(reducers) {
  return function (state = {}, action) { // {counter:{number:0},todo:[]}
    let obj = {};
    for (let key in reducers) {
      obj[key] = reducers[key](state[key], action);
    }
    return obj
  }
}
export default combineReducers({
  counter: counter,
  todo
});

