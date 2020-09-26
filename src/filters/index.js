// 过滤器

export function timeReset(val) {
  const d = new Date(val)
  const yy = d.getFullYear()
  const mm = (d.getMonth() + 1).toString().padStart(2, 0)
  const dd = d
    .getDate()
    .toString()
    .padStart(2, 0)

  const H = d
    .getHours()
    .toString()
    .padStart(2, 0)
  const M = d
    .getMinutes()
    .toString()
    .padStart(2, 0)
  const S = d
    .getSeconds()
    .toString()
    .padStart(2, 0)
  return `${yy}-${mm}-${dd} ${H}:${M}:${S}`
}
