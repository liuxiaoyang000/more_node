// function createStore(reducer){
//   let state;
//   let listeners = [];
//   let getState = () => state;
//   let dispatch = (action) =>{
//     state = reducer(state,action);
//     listeners.forEach(l=>l());
//   }
//   dispatch({type:'@INIT'});
//   let subscribe = (fn)=>{
//     listeners.push(fn);
//     return ()=>{
//        listeners = listeners.filter(l=>fn!=l);
//     }
//   }
//   return {
//     subscribe,
//     getState,
//     dispatch
//   }
// }
import {createStore} from 'redux'
let initState = {number:0};
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
function reducer(state = initState,action){
  switch(action.type){
    case INCREMENT:
    return {number:state.number+action.v}
    case DECREMENT:
    return {number:state.number-action.v}
  }
  return state
}
let store = createStore(reducer);
let render = function () {
  window.counter.innerHTML = store.getState().number
}
render();
store.subscribe(render)
window.add.addEventListener('click',function(){
  store.dispatch({ type: INCREMENT,v:1});
})
window.minus.addEventListener('click', function () {
  store.dispatch({ type: DECREMENT, v: 2 });
})