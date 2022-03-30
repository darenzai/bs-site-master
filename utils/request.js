import axios from 'axios'
import { Message } from 'element-ui'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:88',
  timeout: 12000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    if (cookie.get('xueliedu_jwt_token')) {
      // 如果存在cookie, 则将cookie设置到请求头
      config.headers['token'] = cookie.get('xueliedu_jwt_token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
       * code为非20000是抛错 可结合自己业务进行修改
       */
    const res = response.data
    if (res.code === 20000) {
      return response.data
    } else if (res.code === 25000) {
      return
    } else if (res.code === 28004) { // 鉴权失败
      window.location.href = '/login'
      return
    } else {
      Message({
        message: res.msg || 'error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
  },
  error => {
    console.log('err：' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
