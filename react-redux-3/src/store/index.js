import reducer from './reducer'
// import reduxLogger from 'redux-logger';
import { applyMiddleware, compose, createStore} from 'redux'

// 1)最后返回的函数是真正的dispatch方法
// let reduxLogger = (store)=> (dispatch)=> (action)=>{
//   console.log(store.getState());
//   dispatch(action);
//   console.log(store.getState());
// }

// 2) redux-thunk 实现异步
// import reduxThunk from 'redux-thunk'

// let reduxThunk = (store)=>(dispatch)=>(action)=>{
//   if(typeof action === 'function'){
//     return action(dispatch,store.getState);
//   }
//   return dispatch(action);
// }
// 3) redux-promise
// import reduxPromise from 'redux-promise'

// let reduxPromise = (store) => (dispatch)=> (action)=>{
//   if(action.then && typeof action.then === 'function'){
//     // 如果返回的是一个promise 那么不会处理失败逻辑
//     return action.then(dispatch)
//   }
//   if(action.payload && action.payload.then&& typeof action.payload.then ==='function'){
//     return action.payload.then(function(data){
//       action.payload = data;
//         dispatch(action);
//     },function(err){
//         action.payload = err;
//         dispatch(action);
//         return Promise.reject(err);
//     })
//   }
//   return dispatch(action);
// }
 
//applyMiddleware 会自动执行reduxLogger 的前两个函数 把最终的函数替换掉原有的dispatch方法
// let applyMiddleware = (middleware) => (createStore)=> (reducer)=>{
//   let store = createStore(reducer);
//   let middle =  middleware(store);
//   let dispatch = middle(store.dispatch)
//   return {
//     ...store,
//     dispatch
//   };
// }

let reduxLogger1 = (store)=> (dispatch)=> (action)=>{
  console.log('1',store.getState());
  dispatch(action);
  console.log('1',store.getState());
}
let reduxLogger2 = (store) => (dispatch) => (action) => {
  console.log('2',store.getState());
  dispatch(action);
  console.log('2',store.getState());
}

// createStore  combineReducers bindActionCreators applyMiddleware compose 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducer,composeEnhancers(applyMiddleware(reduxLogger1,reduxLogger2)))

// 写一版  historyApi 路由

// 把dispatch进行重写 
// let oldDispatch = store.dispatch;
// // 中间件的作用 就是在dispatch 中间 更改内容
// store.dispatch = function (action) {
//   console.log(store.getState());
//   oldDispatch(action);
//   console.log(store.getState());
// }

// 把多个中间件 进行组合  洋葱模型 compose


export default store;