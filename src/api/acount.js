/*
  账号相关的api
*/
import req from '@/utils/request'

export function login(parameter) {
  return req.post('/users/checkLogin', parameter)
}

export function acountAdd(parameter) {
  return req.post('/users/add', parameter)
}
