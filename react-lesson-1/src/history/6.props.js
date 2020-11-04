import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// 人的组件 , 需要校验属性 (校验实例上的属性)
// 只是属性校验 不会阻止页面渲染
class Person extends React.Component{ 
  // 默认属性 必须名字叫defaultProps 属于类上的属性 es7
  static defaultProps = {
    name:'zfp1x',
  }
  static propTypes = { // propTypes 就是专门校验类型的
    age: PropTypes.number.isRequired,
    gender:PropTypes.oneOf(['男','女']),
    postion:PropTypes.shape({
      x:PropTypes.number,
      y: PropTypes.number
    }),
    hobby: PropTypes.arrayOf(PropTypes.string),
    salary(props, propName, componentNam){
      if (props[propName] <= 100000){
        throw new Error('收益太低')
      }
    }
  }
  render(){
    return <div>
    hello welcome {this.props.name}
    </div>
  }
}

let obj = {
  age:9,
  gender:'男',
  postion:{
    x:100,
    y:100
  },
  hobby:['写代码'],
  salary:100000
}
ReactDOM.render(<Person {...obj}/>, window.root);