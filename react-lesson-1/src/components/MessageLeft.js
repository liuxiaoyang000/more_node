import React,{Component} from 'react';
import ReactDOM from 'react-dom';
export default class MessageLeft extends Component{
   render(){
      return (<div>
        点赞总数: {this.props.total}
     </div>)
 }
}