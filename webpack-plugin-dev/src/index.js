import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input1 from './Input1'
import Input2 from './Input2'
import { HashRouter as Router, Route } from 'react-router-dom';



// import() 可以实现懒加载

class Build extends React.Component {
  constructor() {
    super();
    this.state = {
      Mod: null
    }
  }
  componentDidMount(){
    this.props.asyncLoad().then(m=>{
      this.setState({
        Mod: m.default
      })
    })
  }
  render() {
    let Mod = this.state.Mod
    return Mod ? <Mod {...this.props}></Mod> : Mod; // 默认渲染null 之后渲染组件
  }
}
let Home = (props) => {
    return <Build {...props} asyncLoad={() => import('./Home')}></Build>
}
let Profile = (props) => {
    return <Build {...props} asyncLoad={() => import('./Profile')}></Build>
}
class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (<Router>
      <div>
        <Route path='/home' component={Home} />
        <Route path='/profile' component={Profile} />
      </div>
    </Router>)
  }
}
// if (module.hot) { // 如果模块有热更新
//   console.log(module.hot)
//   module.hot.accept('./Input1', () => {
//     ReactDOM.render(<App></App>, window.root)
//   })
// }
ReactDOM.render(<App></App>, window.root)

