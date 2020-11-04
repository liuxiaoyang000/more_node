import React,{Component} from 'react';
export default class Detail extends Component{
   
   render(){
      return (<div>
         detail
         {this.props.match.params.name}
     </div>)
 }
}