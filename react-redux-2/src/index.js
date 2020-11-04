import React from 'react';
import ReactDOM from 'react-dom';

import Counter from './components/Counter'
import Todo from './components/Todo'
import Test from './components/Test';

// react-redux 主要是把 react 和redux 进行链接的一个库
// 在父级需要提供store 这样在每个组件中就可以不用引入store了
// Provider != ContextApi Provider
import {Provider}  from 'react-redux'
import store from './store';

ReactDOM.render(<Provider store={store}>
<>
  <Counter></Counter>
  <Todo></Todo>
  <Test><p>xxxx</p><p>xxxx</p></Test>
</>
</Provider>,window.root);


