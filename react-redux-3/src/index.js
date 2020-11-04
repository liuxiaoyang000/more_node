import React from 'react';
import store from './store';
import Counter from './component/Counter';
import ReactDOM from 'react-dom';
import {Provider} from './react-redux';
window.store = store;

ReactDOM.render(<Provider store={store}>
  <Counter />
</Provider>,window.root)