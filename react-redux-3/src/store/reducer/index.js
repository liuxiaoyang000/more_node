import * as Types from '../action-types';
function reducer(state = {number:0},action){
  switch(action.type){
    case Types.INCREMENT:
      return {number:state.number+ action.v}
    case Types.DECRMENT:
      return {number:state.number - action.payload}
  }
  return state;
}

export default reducer