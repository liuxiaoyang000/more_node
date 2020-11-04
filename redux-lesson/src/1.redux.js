// redux 状态管理 把数据集中存放
// 当前所有组件的状态
function createStore(reducer) {
  let state;
  let listeners = []
  let getState = ()=> state; // 把对象克隆一份
  let dispatch = (action)=>{
    state = reducer(state,action);
    listeners.forEach(fn=>fn());
  }
  let subscribe = (fn)=>{
    listeners.push(fn);
    return ()=>{
      listeners = listeners.filter(l=>fn !== l);
    }
  }
  dispatch({type:'@INIT'})
  return {
    subscribe,
    getState,
    dispatch
  }
}
// 1.redux 中不能直接操作状态
// 2.如果任意一个组件中想更新状态，需要派发一个动作
// 3.每次更新状态 最好用一个新的状态对像覆盖掉 （时间旅行）
let initState  = { // 状态已经抽离出去了不能直接更改
  title: { content: '你好', color: 'red' },
  content: { content: '哈哈', color: 'green' }
}
function reducer(state = initState,action){ // reducer的参数 有两个第一个就是用户派发的动作，第二个就是当前组件的状态
  switch (action.type) {
    case 'CHANGE_TITLE_COLOR':
      return {...state,title:{...state.title,color:action.color}}
    case 'CHANGE_CONTENT_CONTENT':
      return {...state,content:{...state.content,content:action.content}}
  }
  return state
}
let store = createStore(reducer);
store.subscribe(renderApp);
let unsub = store.subscribe(()=>console.log('呵呵 更新了'))
setTimeout(() => {
  // 实现状态更新的方法
  store.dispatch({type:'CHANGE_TITLE_COLOR',color:'pink'});
}, 1000);
setTimeout(() => {
  unsub();
  store.dispatch({ type: 'CHANGE_CONTENT_CONTENT', content: '新的内容' });
}, 2000);
function renderTitle(){
  let title = document.getElementById('title');
  title.innerHTML = store.getState().title.content;
  title.style.background = store.getState().title.color;
}
function renderContent() {
  let content = document.getElementById('content');
  content.innerHTML = store.getState().content.content;
  content.style.background = store.getState().content.color;
}
function renderApp(){
  renderTitle();
  renderContent();
}
renderApp();