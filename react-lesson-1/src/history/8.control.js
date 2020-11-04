import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// 如果使用非受控组件好处就是 可以和第三方库使用
// 如果只是点击按钮获取 输入框的内容 更推荐 非受控组件
class Control extends Component {
  password = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.username.value);
    console.log(this.password.current.value);
  }
  render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <input required type="text" name="username" ref={(dom) => this.username = dom} />
        <input type="email" name="password" ref={this.password} />
        <button type="submit">提交</button>
      </form>
    </div>)
  }
}
ReactDOM.render(<Control></Control>, window.root);