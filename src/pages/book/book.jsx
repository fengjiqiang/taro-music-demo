import { Component } from 'react'
import Taro from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtActivityIndicator, AtDivider } from "taro-ui"
import log from '@/utils/log'
import AllConfigSet from '@/utils/config'
import { getBookList } from '@/actions/book'
import RLTheme from '@/components/RLTheme'


const scrollTop = 0   // 设置竖向滚动条位置

export default class Book extends Component {

    state = {
        book: [],
        scrollHeight: 700,
        current: 1,
        pageSize: 12,
        total: 0,
        loading: false,
        hasMore: true,
    }

    componentWillMount() {
        const { windowHeight } = AllConfigSet.appData
        console.log('windowHeight :>> ', windowHeight);
        this.setState({ scrollHeight: windowHeight })
    }

    componentDidMount() {
        this.refreshList()
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    onShareAppMessage() {
        return {
            path: `/pages/book/book`
        }
    }

    getBookList = (current) => {
        this.setState({ loading: true })
        return getBookList({
            current,
            pageSize: this.state.pageSize
        }).then(res => {
            this.setState({
                current: res.pageInfo.current,
                total: res.pageInfo.total
            })
            return res.lists
        }).catch(err => {
            console.log('getBookList=>err', err)
            log.error("getBookList=>err: " + err)
        }).finally(() => {
            this.setState({ loading: false })
        })
    }

    refreshList = () => {
        this.getBookList(1).then(data => {
            this.setState({ book: data })
        })
    }

    getMoreData = () => {
        if (this.state.book.length >= this.state.total) {
            this.setState({ hasMore: false })
            return
        }
        this.getBookList(this.state.current + 1).then(data => {
            let newList = this.state.book.concat(data)
            this.setState({ book: newList })
        })
    }

    renderBookItem = () => {
        return (
            this.state.book.map(item => {
                return (
                    <AtList key={item.id}>
                        <AtListItem
                          arrow='right'
                          note={item.author}
                          title={item.title}
                          extraText={item.pubdate}
                          onClick={() => {
                                Taro.navigateTo({
                                    url: `../bookDetails/bookDetails?data=${JSON.stringify(item)}`
                                });
                            }}
                        />
                    </AtList>
                )
            })
        )
    }

    onScroll = (e) => {
        console.log('onScroll :>>', e.detail)
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                  className='scrollview'
                  scrollY
                  scrollWithAnimation
                  scrollTop={scrollTop}
                  style={{ height: this.state.scrollHeight }}
                  onScrollToUpper={this.refreshList}
                  onScrollToLower={this.getMoreData}
                  // onScroll={this.onScroll}
                >
                    <View style={{ flex: 1 }}>
                        {this.renderBookItem()}
                        {
                            this.state.loading &&
                            <AtActivityIndicator content='加载中...' mode='center' color={RLTheme.themeColor} size={40} />
                        }
                        {
                            !this.state.hasMore &&
                            <AtDivider content='没有更多了' fontColor={RLTheme.themeColor} lineColor='#fff' />
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
