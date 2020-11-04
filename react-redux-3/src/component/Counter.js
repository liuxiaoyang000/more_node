import React,{Component} from 'react';
import actions from '../store/action/counter'
import {connect} from '../react-redux';
import {bindActionCreators} from 'redux';
 class Counter extends Component{
    constructor(){
        super();
   }
   render(){
      return (<div>
         {this.props.number}
         <button onClick={()=>this.props.add(2)}>+</button>
        <button onClick={() => this.props.minus(3)}>-</button>
     </div>)
 }
}
let mapStateToProps = (state) =>{
  return {
    ...state
  }
}
let mapDipsatchToProps = (dispatch)=>{
  return {
    add:(v)=>dispatch(actions.add(v)),
    minus:(v)=>dispatch(actions.minus(v)),
  }
}
export default connect(mapStateToProps, actions)(Counter); 

// 为什么函数柯里化