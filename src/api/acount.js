/*
  账号相关的api
*/
import req from '@/utils/request'

export function login(parameter) {
  return req.post('http://127.0.0.1:5000/users/checkLogin', parameter)
}
