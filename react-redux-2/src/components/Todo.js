import React,{Component} from 'react';
import actions from '../store/actions/todo';
import {connect} from 'react-redux';
class Todo extends Component{
  // store.getState() 并不是响应式的
  input = React.createRef();
  handleClick = ()=>{
    this.props.addTodo(this.input.current.value);
  }
   render(){
      return (<div>
         <input type="text" ref={this.input}/> <button onClick={this.handleClick}>添加</button>
         <ul>
           {this.props.todos.map((item,key)=>(
            <li key={key}>{item}</li>
           ))}
         </ul>
      </div>)
  }
}
let mapStateToProps = (state)=>{
  return {
    todos:state.todo
  }
}
let mapDispatchToProps = (dispatch)=>{
  return {
    addTodo: (todo) =>dispatch(actions.addTodo(todo))
  }
}
export default connect((state)=>({todos:state.todo}),actions)(Todo)

//  周日:路由 用法 + 原理 + react-redux原理 
//  周一: redux 中间件  saga  + dva + 周末讲项目 2天
//  webpack 周内 周末讲项目 2天  1 3 67

//  state = {
//     todos: store.getState().todo
//   }
//   componentWillMount(){
//     store.subscribe(()=>{
//       this.setState({
//         todos: store.getState().todo
//       })
//     })
//   }