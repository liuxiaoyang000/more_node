import React, { Component } from 'react';
import { Consumer} from './context';
import pathToRegExp from 'path-to-regexp';
export default class Route extends Component {
  render() {
    return (<Consumer>
    {(value)=>{
        let {location:{pathname}} = value;
        let props = {...value,match:null};
        let {path="/",component:Component,exact=false,render,children} = this.props;
        let keys = [];
        let reg = pathToRegExp(path, keys, { end: exact});
        if (reg.test(pathname)){
          // 如果匹配到后 需要看看由于没有路径参数 /user/detail/:id
          let [,...args] = pathname.match(reg); // ['/user/detail/1',1]
          keys = keys.map(k => k.name); // ['name']
          let params = keys.reduce((memo,key,index)=>(memo[key]=args[index],memo),{});
          props.match = {params}
          if(Component){
            return <Component {...props}></Component>
          }else if(render){
              return render(props);
          } else if (children){
            return children(props);
          }
        }else{
          if(children){
            return children(props);
          }
          return null
        }
       
    }}
    </Consumer>)
  }
}