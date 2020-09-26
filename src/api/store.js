// 店铺管理

import req from '@/utils/request'

//  26. 获取店铺详情
export function getShopInfo(parameter) {
  return req.get('/shop/info', parameter)
}

//  28. 店铺内容修改
export function shopEdit(parameter) {
  return req.post('/shop/edit', parameter)
}
