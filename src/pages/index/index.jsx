import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { AtList, AtListItem, AtIcon, AtCard, AtNoticebar } from "taro-ui"
import log from '@/utils/log'
import AllConfigSet from '@/utils/config'
import { getBookList } from '@/actions/book'

import './index.less'


export default class Index extends Component {

  state = {
    book: [],
    banner: [{
      id: 1,
      src: 'https://boom-beiyan-sitemgt.oss-cn-beijing.aliyuncs.com/resource/1650013429625934f5dc473.jpeg'
    }, {
      id: 2,
      src: 'https://boom-beiyan-sitemgt.oss-cn-beijing.aliyuncs.com/resource/16500130376259336d350a6.jpeg'
    }, {
      id: 3,
      src: 'https://zz-test.boom.cn:9903/bag/file/down/624e7c754014bda9d905dd70'
    }],
    pageSize: 3
  }

  componentWillMount () { }

  componentDidMount () {
    this.refreshList()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onShareAppMessage() {
    return {
      path: `/pages/index/index`
    }
  }

  getBookList = (current) => {
    return getBookList({
      current,
      pageSize: this.state.pageSize,

    }).then(res => {
      return res.lists
    }).catch(err => {
      console.log('getBookList=>err', err)
      log.error("getBookList=>err: " + err)
    })
  }

  refreshList = () => {
    this.getBookList(1).then(data => {
      this.setState({ book: data })
    })
  }

  renderBookItem = () => {
    return (
      this.state.book.map(item => {
        return (
          // List 列表
          // <AtList key={item.id}>
          //   <AtListItem
          //     arrow='right'
          //     note={item.author}
          //     title={item.title}
          //     extraText={item.pubdate}
          //     onClick={() => {
          //       Taro.navigateTo({
          //         url: `../bookDetails/bookDetails?data=${JSON.stringify(item)}`
          //       });
          //     }}
          //   />
          // </AtList>
          // Card 卡片
          <View key={item.id} style={{ marginTop: 10 }}>
            <AtCard
              className='my-card'
              // note='小Tips'
              extra={item.author}
              title={item.title}
              onClick={() => {
                Taro.navigateTo({
                  url: `../bookDetails/bookDetails?data=${JSON.stringify(item)}`
                });
              }}
            >
              <View className='line-clamp-2'>
                {item.introduction}
              </View>
            </AtCard>
          </View>
        )
      })
    )
  }

  renderBanner = () => {
    return (
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor={AllConfigSet.basicModalBtn}
        circular
        indicatorDots
        autoplay
        style={{ height: 260 }}
      >
        {
          this.state.banner.map(item => {
            return (
              <SwiperItem key={item.id}>
                <Image
                  className='at-article__img'
                  src={item.src}
                  mode='widthFix'
                />
              </SwiperItem>
            )
          })
        }
      </Swiper>
    )
  }

  render () {
    const baseStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
    return (
      <View style={{ flex: 1 }}>
        <AtNoticebar marquee icon='volume-plus' speed={50}>
          基于`Taro`开发，技术栈主要是：`taro+taro-ui+react+redux`，适合新手上手。Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发小程序/H5/RN 等应用。
        </AtNoticebar>
        {this.renderBanner()}
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, marginTop: 10, marginBottom: 10 }}>
          <View style={baseStyle}>
            <AtIcon value='money' size='20' color={AllConfigSet.basicModalBtn} />
            <Text style={{ fontSize: 18, color: '#333', marginLeft: 5 }}>推荐书籍</Text>
          </View>
          <View
            style={baseStyle}
            onClick={() => {
              Taro.navigateTo({
                url: '../book/book'
              })
            }}
          >
            <Text style={{ fontSize: 16, color: '#999' }}>更多</Text>
            <View className='at-icon at-icon-chevron-right' style={{ color: '#999' }} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {this.renderBookItem()}
        </View>
      </View>
    )
  }
}
