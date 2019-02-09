// 请求
// const URL = 'http://127.0.0.1:8021/api/'
const URL = 'http://192.168.0.104:8021/api/'

const wxRequest = ({url, method = 'GET', data = {}}, {loading = true, tip = true, navLoading = false} = {}) => {
  if (loading) wx.showLoading({title: 'loading...', mask: true})
  if (navLoading) wx.showNavigationBarLoading()
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
        if (loading) wx.hideLoading()
        if (navLoading) wx.hideNavigationBarLoading()    
      }
    })
  })
}

const request = {}


/**
 * 获取当前热搜
 */
request.fetchRealtimeHotwords = () => {
  return wxRequest({
    url: 'realtimehot'
  })
}

/**
 * 搜索热搜
 */
request.searchKeyword = keyword => {
  return wxRequest({
    url: 'search_by_keyword',
    data: {
      keyword
    }
  }, {
    loading: false,
    navLoading: true
  })
}

/**
 * 历史数据
 * desc [desc1, desc2, ...]
 * 
 */
request.fetchHistoryDataByDesc = desc => {
  return wxRequest({
    url: 'historydata_by_desc',
    method: 'POST',
    data: {
      desc
    }
  })
}


export default request
