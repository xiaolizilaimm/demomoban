/*
localStorage的封装
*/

export default {
  get(k) {
    return window.localStorage.getItem(k)
  },
  set(k, v) {
    window.localStorage.setItem(k, v)
  },
  rem(k) {
    window.localStorage.removeItem(k)
  },
  clear() {
    window.localStorage.clear()
  }
}
