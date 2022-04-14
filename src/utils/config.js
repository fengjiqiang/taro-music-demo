import Taro from '@tarojs/taro'

const AllConfigSet = {
    basicModalBtn: '#8F1D22',
    capsule: Taro.getMenuButtonBoundingClientRect,
    appData: Taro.getSystemInfoSync,
    tVmin: (rpx) => {
        return (rpx * 100 / 750).toFixed(3) + 'vmin'
    },
    rightBox: 700
}

export default AllConfigSet
