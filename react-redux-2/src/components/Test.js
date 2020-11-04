import React from 'react';

export default class Test extends React.Component{
  render(){
    return <div>
    hello
    {React.Children.map(this.props.children,(child,index)=>{
        console.log(child)
        return <li>{child}</li>
    })}
    </div>
  }
}