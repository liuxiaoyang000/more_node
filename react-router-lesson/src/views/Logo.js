import React,{Component} from 'react';
import {withRouter} from '../react-router-dom';
class Logo extends Component{
   handleClick = ()=>{
     this.props.history.push('/profile')
   }
   render(){
     return (<a className="navbar-brand" onClick={this.handleClick}>珠峰管理</a>)
 }
}
export default withRouter(Logo);