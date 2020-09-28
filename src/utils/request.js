/*
  封装通用的请求和信息
*/

import axios from 'axios'
import qs from 'qs'
import local from '@/utils/local'
import { Message } from 'element-ui'
// 引入 NProgress 组件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.timeout = 5000

// axios请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  const token = local.get('k_v')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// axios响应拦截
axios.interceptors.response.use(res => {
  // console.log(res.data)
  const { code, msg } = res.data
  if (code === 0) {
    Message({
      type: 'success',
      message: msg
    })
  } else if (code === 1) {
    Message({
      type: 'error',
      message: msg
    })
  }
  NProgress.done()
  return res
})

export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, reqbody) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(reqbody))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
