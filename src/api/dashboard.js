/*
  账号相关的api
*/
import req from '@/utils/request'

// 29. 首页报表接口
export function totaldata(parameter) {
  return req.get('/order/totaldata', parameter)
}
