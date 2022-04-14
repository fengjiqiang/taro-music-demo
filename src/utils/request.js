import Taro from '@tarojs/taro';
import md5 from 'js-md5';
import hostConfig from './hostConfig';
import head from './head';

export function request(req) {
    const { url, method, data, needEncry } = req;
    let header = { ...head };
    if (needEncry) {   // 加密
        let delay = new Date().getTime() + '';
        let checkdelay = md5(delay.substr(delay.length - 5, 5) + header.p + header.ver + header.ch + delay.substr(0, 5) + header.os + delay);
        header.checkdelay = checkdelay
        header.delay = delay
        header.version = header.ver
    }
    return Taro.request({
        url: url.indexOf('https://') == -1 ? hostConfig.host + url : url,
        method,
        data,
        header: {
            ...header,
            'Authorization': '',   // 实际项目开发请求接口的token
        }
    }).then(response => {
        console.log(`此【${url}】请求返回`, response);
        if (response.statusCode == 200) {
            if (response.data?.code == 440001) {
                return Promise.reject(response.data)
            } else {
                return response.data
            }
        }
    }).catch(err => {
        if (err?.errMsg == 'request:fail ') {
            return Promise.reject({ msg: '网络错误' })
        }
        return Promise.reject(err)
    })
}
