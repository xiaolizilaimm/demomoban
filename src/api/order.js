// 订单管理

import req from '@/utils/request'

//  22. 获取订单列表
export function getList(parameter) {
  return req.get('/order/list', parameter)
}

//  22. 获取订单列表
export function searchList(parameter) {
  return req.get('/order/search', parameter)
}
