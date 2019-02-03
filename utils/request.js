// 请求
// const URL = 'http://127.0.0.1:8021/api/'
const URL = 'http://192.168.0.104:8021/api/'

const wxRequest = ({url, method = 'get', data = {}}, {loading = true, tip = true} = {}) => {
  if (loading) wx.showLoading({title: 'loading...', mask: true})
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
            if (tip) {
              wx.showToast({
                title: `errcode: ${data.err} ,msg: ${data.errmsg}`,
                icon: 'none'
              })
            }
            reject(data.errmsg)
          }
        } else {
          if (tip) wx.showToast({ title: `网络错误：${res.statusCode}`, icon: 'none' })
          reject(res.data)
        }
      },
      fail(err) {
        if (tip) wx.showToast({ title: '接口调用失败', icon: 'none' })
        reject(err)
      },
      complete() {
        wx.hideLoading()        
      }
    })
  })
}

const request = {}

// 获取当前热搜
request.fetchRealtimeHotwords = () => {
  return wxRequest({
    url: 'realtimehot'
  })
}

// 搜索热搜
request.searchKeyword = keyword => {
  return wxRequest({
    url: 'search/keyword',
    data: {
      keyword
    }
  })
}

export default request
