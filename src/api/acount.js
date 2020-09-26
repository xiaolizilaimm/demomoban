/*
  账号相关的api
*/
import req from '@/utils/request'

// 登录
export function login(parameter) {
  return req.post('/users/checkLogin', parameter)
}

// 添加账号
export function acountAdd(parameter) {
  return req.post('/users/add', parameter)
}

// 获取账号列表
export function acountList(parameter) {
  return req.get('/users/list', parameter)
}

// 删除账号
export function remUser(parameter) {
  return req.get('/users/del', parameter)
}

// 批量删除
export function batchDel(parameter) {
  return req.get('/users/batchdel', parameter)
}

// 修改账号
export function modifyUser(parameter) {
  return req.post('/users/edit', parameter)
}

// 检查旧密码是否正确
export function checkoldpwd(parameter) {
  return req.get('/users/checkoldpwd', parameter)
}

//  修改密码
export function editpwd(parameter) {
  return req.post('/users/editpwd', parameter)
}

// 个人中心
export function userList(parameter) {
  return req.get('/users/info', parameter)
}

// 上传头像
export function upDataImg(parameter) {
  return req.get('/users/avataredit', parameter)
}
