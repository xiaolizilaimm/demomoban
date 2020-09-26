// 商品管理

import req from '@/utils/request'

//  添加分类
export function addcate(parameter) {
  return req.post('/goods/addcate', parameter)
}

//  获取分类
export function catelist(parameter) {
  return req.get('goods/catelist', parameter)
}

// 14. 删除分类
export function delcate(parameter) {
  return req.get('/goods/delcate', parameter)
}

// 15. 修改分类
export function editcate(parameter) {
  return req.post('/goods/editcate', parameter)
}

// 16. 查询所有分类名称
export function goodsCategories(parameter) {
  return req.get('/goods/categories', parameter)
}

// 18. 添加商品
export function goodsAdd(parameter) {
  return req.post('/goods/add', parameter)
}

// 19. 获取商品列表
export function dataList(parameter) {
  return req.get('/goods/list', parameter)
}

// 20. 删除商品
export function dataDel(parameter) {
  return req.get('/goods/del', parameter)
}
