import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import './index.less'


export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <AtList>
          <AtListItem title='标题文字' note='描述信息' />
          <AtListItem title='标题文字' note='描述信息' arrow='right' />
          <AtListItem
            arrow='right'
            note='描述信息'
            title='标题文字标题文字标题文字标题文字标题文字'
            extraText='详细信息详细信息详细信息详细信息'
          />
        </AtList>
      </View>
    )
  }
}
