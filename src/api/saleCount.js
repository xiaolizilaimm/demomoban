/*
  账号相关的api
*/
import req from '@/utils/request'

// 30. 订单报表接口
export function orderTotal(parameter) {
  return req.get('/order/ordertotal', parameter)
}
