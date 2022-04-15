import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'


export default class BookDetails extends Component {

    state = {
        bookInfo : {}
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    onLoad(option) {
        console.log('option :>> ', option);
        let bookInfo = JSON.parse(option.data)
        this.setState({ bookInfo })
    }

    renderBookInfo = () => {
        const { title, pubdate, author, introduction, publisher, translator, image } = this.state.bookInfo
        return (
            <View className='at-article'>
                <View className='at-article__h1'>{title}</View>
                <View className='at-article__info'>
                    {translator}&nbsp;&nbsp;&nbsp;{publisher}
                </View>
                <View className='at-article__content'>
                    <View className='at-article__section'>
                        <View className='at-article__h2'>{author}</View>
                        <View className='at-article__h3'>{pubdate}</View>
                        <View className='at-article__p'>{introduction}</View>
                        <Image
                          className='at-article__img'
                          src={image}
                          mode='widthFix'
                        />
                    </View>
                </View>
            </View>
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
