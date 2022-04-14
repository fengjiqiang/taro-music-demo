import Taro from "@tarojs/taro";
import store from '@/store/index.js';
import { CLEARUSER } from "@/constants/index";


export function getStorage(req) {
    return Taro.getStorageSync(req);
}
export function setStorage(name, req) {
    Taro.setStorageSync(name, req);
}
export function clearStorage(req) {
    return Taro.clearStorageSync(req);
}
export function setPageTitle(data) {
    Taro.setNavigationBarTitle({
        title: data
    })
}
export function getWebViewDate(arr) {
    let resObj = {};
    arr.forEach(ele => {
        let flag = '';
        for (flag in ele) {
            resObj[flag] = ele[flag];
        }
    })
    let resObjArr = Object.keys(resObj);
    if (!resObjArr.length) {
        return
    } else {
        resObjArr.forEach(ele => {
            if (ele == 'token') {
                if (!resObj[ele]) {
                    clearStorage(ele);
                    store.dispatch({
                        type: CLEARUSER
                    })
                } else {
                    clearStorage(ele);
                    store.dispatch({
                        type: CLEARUSER
                    })
                    setStorage('token', resObj[ele])
                }
            }
        })
    }
}
/**
 * 解码
 */
export function deCodeRoomCode(code) {
    if (!code || code === '') return '';
    let strArr = []
    if (code.indexOf('-') !== -1) {
        strArr = code.split('-');
    } else {
        strArr = code.split(' ');
    }
    code = strArr.join('');
    return code;
}
/**
 * 编码
 */
export function enCodeRoomCode(code) {
    if (!code || code === '') return '';
    let strArr = [];
    if (code.length > 0 && code.length < 7) {
        // 位数分割长度
        let n = 3;
        for (let i = 0; i < code.length / n; i++) {
            let value = code.slice(n * i, n * (i + 1));
            strArr.push(value);
        }
    }
    code = strArr.join(' ');
    return code;
}
/**字节数限制 */
export function limitInputCharLen(str, maxLen) {
    let w = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
        if (w > maxLen) {
            str = str.substr(0, i);
            return str
        }
    }
    return str
}
export function getTimeStr(timestamp) {
    let hour = Math.floor(timestamp / 3600)
    let hourtemp = hour <= 9 ? '0' + hour : hour + ''
    let minute = Math.floor(timestamp % 3600 / 60)
    let minutetemp = minute <= 9 ? '0' + minute : minute + ''
    let second = timestamp % 60
    let secondtemp = second <= 9 ? '0' + second : second + ''
    return `${hourtemp}:${minutetemp}:${secondtemp}`;
}
export function getDateString(res) {
    let listDate = new Date(res);
    let currentDate = new Date();
    let month = listDate.getMonth() + 1 < 10 ? '0' + (listDate.getMonth() + 1) : listDate.getMonth() + 1;
    let date = listDate.getDate() < 10 ? '0' + listDate.getDate() : listDate.getDate();
    let hours = listDate.getHours() < 10 ? '0' + listDate.getHours() : listDate.getHours();
    let minute = listDate.getMinutes() < 10 ? '0' + listDate.getMinutes() : listDate.getMinutes();
    if (currentDate.setHours(0, 0, 0, 0) == listDate.setHours(0, 0, 0, 0)) {
        return hours + ':' + minute;
    } else {
        return month + '月' + date + '日' + '    ' + hours + ':' + minute
    }
}
export function random(size) {
    let seed = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];//数组
    let seedlength = seed.length;//数组长度
    let create = '';
    let j = '';
    for (let i = 0; i < size; i++) {
        j = Math.floor(Math.random() * seedlength);
        create += seed[j];
    }
    return create;
}
/**解析链接后面的参数*/
export function setHref(href) {
    let sStr = href;
    let params = {};
    let pattern = /(\w+)=([^&#]*)*/g;
    let arr = sStr.match(pattern);
    if (arr) {
        for (let i = 0; i < arr.length; i++) {
            let kv = arr[i].split('=');
            params[kv[0]] = kv[1];
        }
    }
    return params;
}
export function goBackHome() {
    let currentRoute = Taro.getCurrentPages();
    let hasHomeIndex = false;
    let homeIndex = '';
    currentRoute.forEach((page, index) => {
        if (page.route.indexOf('index/index') !== -1) {
            hasHomeIndex = true;
            homeIndex = index;
        }
    })
    if (hasHomeIndex) {
        let goIndex = currentRoute.length - 1 - homeIndex;
        Taro.navigateBack({
            delta: goIndex
        })
    } else {
        Taro.redirectTo({
            url: '../index/index'
        })
    }
}
