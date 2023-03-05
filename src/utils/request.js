import axios from 'axios'
axios.defaults.withCredentials=true
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        // baseURL: 'http://47.101.72.29:8080/',
        timeout: 2000
    })

// 请求数据
    instance.interceptors.request.use(data => {
        return data
    }, err => {
        console.log(err);
    })

    // 拦截请求
    instance.interceptors.response.use(data => {
        return data.data
    })
    return instance(config)
}