import React, { Component } from 'react';
import axios from 'axios';
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRight';
import { Provider } from "./Context.js";
axios.interceptors.request.use(function (config) {
  config.headers = {
    token: 'xxxx'
  }
  return config;
})
// fetch  原生提供的 基于promise 太底层
// axios  基于promise 拦截器
axios.interceptors.response.use(function (res) {
  if (res.data.code == 1) { // 成功
    return res.data.data
  }
  return Promise.reject();
})
export default class MessageBox extends Component {
  state = {
    lists: [],
    total: 0
  }
  handleClick = (val) => {
    this.setState({
      total: this.state.total + val
    })
  }
  resetClick = (val) => {
    this.setState({
      total: 0
    })
  }
  async componentDidMount() {
    // 获取ajax数据
    let lists = await axios.get('/list.json');
    this.setState({
      lists
    })
  }
  render() {
    return (
      // 提供的值必须叫value属性
      <Provider value={{r: this.resetClick}}>
        <div className="container">
          <div className="panel panel-danger">
            <div className="panel-heading">
              列表点赞
            </div>
            <div className="panel-body">
              <MessageRight lists={this.state.lists} fn={this.handleClick}></MessageRight>
            </div>
            <div className="panel-footer">
              <MessageLeft total={this.state.total}></MessageLeft>
            </div>
          </div>
        </div>
      </Provider>
    )
  }
}