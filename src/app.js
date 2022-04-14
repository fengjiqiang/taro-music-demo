import 'taro-ui/dist/style/index.scss'   //  在入口文件中引入 taro-ui 所有的样式
import { Component } from 'react'
import { Provider } from 'react-redux'
import configStore from './store/index'
import './app.less'

const store = configStore

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
