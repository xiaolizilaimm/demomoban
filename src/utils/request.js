/*
  封装通用的请求和信息
*/

import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.timeout = 5000

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
