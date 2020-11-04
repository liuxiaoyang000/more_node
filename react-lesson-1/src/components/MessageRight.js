import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import MessageItem from './MessageItem';
export default class MessageRight extends Component{
  render(){
      return (<ul className="list-group">
        {this.props.lists.map((list,key)=>(
          // key属性被内置了 不会作为属性传递给子组件
          <MessageItem list={list} key={key} index={key} fn={this.props.fn}></MessageItem>
        ))}
      </ul>)
 }
}