import { request } from "@/utils/request";

export async function getBookList(data) {
    const url = '/api/book/list'
    const res = await request({ url, method: 'get', data }).catch(err => {
        return Promise.reject(res)
    })
    if (res.code != 200) {
        return Promise.reject(res)
    }
    return res.data
}
