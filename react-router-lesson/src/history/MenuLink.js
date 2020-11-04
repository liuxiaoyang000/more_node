import React from 'react';

import {Link,Route} from 'react-router-dom';

// children就是不管路径是否匹配到都能执行
export default function (p) {
  // 主要用到的就是route 匹配到后的match
  return <Route path={p.to} exact={p.exact} children={(props)=>{
    return <li className={props.match?'active':''}>
      <Link to={p.to}>{p.children}</Link>
    </li>
  }}/>
}