import React, { Component } from 'react';
export default class Home extends Component {
  render() {
    console.log(this.props)
    return (<div>
      Home
      <button onClick={
        ()=>{
          this.props.history.push('/profile')
        }
      }>去个人中心</button>
     </div>)
  }
}