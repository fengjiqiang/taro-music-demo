import log from "@/utils/log";

const ev = process.env.NODE_ENV;
let host = '';   // api接口地址

console.log(ev, '当前js环境')
log.info('当前js环境====>: ' + ev)
if (ev === 'development') {
    host = 'http://172.23.11.47:3721';
} else {
    host = 'http://172.23.11.47:3721';
}
const hostConfig = {
    host
}
export default hostConfig
