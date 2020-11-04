// React中的跨组件传递 context Api 

import React from 'react';
// 创建一个消费者和提供者
let {Provider,Consumer}  = React.createContext();
// 导出一个对象
export { Provider, Consumer}