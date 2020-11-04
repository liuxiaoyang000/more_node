import {createStore} from  '../redux';
import reducer from './reducers/index.js'
console.log(reducer)
let store = createStore(reducer);
window.store = store;
export default store;

// 1.redux原则就是一个项目只有一个store 只有一个状态 （只有一个管理员）
// 宏