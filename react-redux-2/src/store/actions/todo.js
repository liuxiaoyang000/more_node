
import * as Types from '../action-types';


export default {
  addTodo(todo){
    return {type:Types.ADD_TODO,todo}
  }
}