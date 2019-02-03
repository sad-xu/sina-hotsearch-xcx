// 公用方法
const util = {}

/**
 * 时间格式化
 * 1546254900  Number
 */
util.timeFormat = (time) => {
  if (!time) return ''
  return new Date(time * 1000).toISOString()
}

export default util



