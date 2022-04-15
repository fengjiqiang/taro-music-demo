import { Component } from 'react'
import { ScrollView, View, Image } from '@tarojs/components'
import { AtTag } from 'taro-ui'


export default class BookDetails extends Component {

    state = {
        bookInfo : {}
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    onShareAppMessage() {
        return {
            path: `/pages/bookDetails/bookDetails?data=${JSON.stringify(this.state.bookInfo)}`
        }
    }

    onLoad(option) {
        console.log('option :>> ', option);
        let bookInfo = JSON.parse(option.data)
        this.setState({ bookInfo })
    }

    renderBookInfo = () => {
        const { title, pubdate, author, introduction, publisher, translator, image, tags } = this.state.bookInfo
        return (
            <ScrollView>
                <View className='at-article'>
                    <View className='at-article__h1'>{title}</View>
                    <View className='at-article__info'>
                        {translator}【译】&nbsp;&nbsp;&nbsp;{publisher}
                    </View>
                    <View className='at-article__info' style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                        {
                            tags?.map((item, index) => {
                                return (
                                    <View key={index.toString()} style={{ marginRight: 5 }}>
                                        <AtTag type='primary' circle active>
                                            {item}
                                        </AtTag>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className='at-article__content'>
                        <View className='at-article__section'>
                            <View className='at-article__h2'>{author}【著】</View>
                            <View className='at-article__h3'>{pubdate}【出版】</View>
                            <View className='at-article__p'>{introduction}</View>
                            <Image
                              className='at-article__img'
                              src={image}
                              mode='widthFix'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderBookInfo()}
            </View>
        )
    }
}
