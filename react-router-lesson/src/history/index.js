import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect, Link,NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from './views/Home.js';
import Profile from './views/Profile.js';
import User from './views/User';
import Login from './views/Login';
import Protected from './Protected';
import MenuLink from './MenuLink'
import 'bootstrap/dist/css/bootstrap.css'
class App extends React.Component {
  render() {
    return <Router>
      <div>
        {/* switch组件 匹配到一个后就不会在继续匹配了 */}
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">珠峰管理</a>
            </div>
            <ul className="navbar-nav nav">
              {/* <li><NavLink to="/" exact={true}> 首页</NavLink></li>
              <li><NavLink to="/profile"> 个人中心 </NavLink></li>
              <li><NavLink to="/user"> 用户</NavLink></li>
              <li><NavLink to="/login"> 登录</NavLink></li> */}

              <MenuLink to="/" exact={true}>首页</MenuLink>
              <MenuLink to="/profile" exact={true}>个人中心</MenuLink>
              <MenuLink to="/user" exact={true}>用户</MenuLink>
              <MenuLink to="/login" exact={true}>登录</MenuLink>
            </ul>
          </div>
        </div>
        <div className="container">
        <Switch>
          <Route path="/" exact={true} component={Home}></Route>
          <Protected path="/profile"  component={Profile}></Protected>
          {/* 默认需要先匹配到一级 才能展现二级 */}
          <Route path="/user" component={User}></Route>
          <Route path="/login" component={Login}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
        </div>
        
      </div>
    </Router>
  }
}


ReactDOM.render(<App />, window.root);