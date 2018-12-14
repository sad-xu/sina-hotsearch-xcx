// 请求
const URL = 'http://127.0.0.1:8021/api/'

const request = ({url, method = 'get', data = {}}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL + url,
      method,
      data,
      success(res) {
        if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 304) {
          let data = res.data
          if (data.err === 0) {
            resolve(data.data)
          } else {
            console.log(`errcode: ${data.err} ,msg: ${data.errmsg}`)
            reject(data.errmsg)
          }
        } else {
          console.log('网络错误')
          reject(res.data)
        }
      },
      fail(err) {
        console.log('接口调用失败')
        reject(err)
      }
    })
  })
}

// 获取当前热搜
const getRealtimeHot = () => {
  return request({
    url: 'realtimehot'
  })
}

export default {
  getRealtimeHot,

}
