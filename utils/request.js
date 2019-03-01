// 请求
const URL = 
  // 'http://192.168.0.101:8021/'
  'https://sadxu.top/'

const apiUrl = 'api/'

const wxRequest = ({url, method = 'GET', data = {}}, {loading = true, tip = true, navLoading = false} = {}) => {
  if (loading) wx.showLoading({title: 'loading...', mask: true})
  if (navLoading) wx.showNavigationBarLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url: URL + url,
      method,
      header: {
        'sadtoken': wx.getStorageSync('token')
      },
      data,
      success(res) {
        if ((res.statusCode >= 200 && res.statusCode < 300) || res.statusCode === 304) {
          let { err, errmsg, data } = res.data
          if (err === 0) {
            resolve(data)
          } else if (err === 999 || err === 998) {  // token失效 重新登录
            doLogin().then(() => {
              resolve(wxRequest({ url, method, data }, { loading, tip, navLoading }))
            })
          } else {
            if (tip) {
              wx.showToast({
                title: `errcode: ${err} ,msg: ${errmsg}`,
                icon: 'none'
              })
            }
            reject(errmsg)
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
 * login
 */
function doLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        let code = res.code
        if (code) {
          wxRequest({
            url: 'login',
            method: 'POST',
            data: {
              code: code
            }
          }, {
            loading: false,
            tip: false,
            navLoading: false
          }).then(res => {
            wx.setStorageSync('token', res)
            resolve()
          })
        } else {
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
request.doLogin = doLogin

/**
 * 获取当前热搜
 */
request.fetchRealtimeHotwords = () => {
  return wxRequest({
    url: apiUrl + 'realtimehot'
  })
}

/**
 * 推荐热搜
 * 
 */
request.fetchRecommendHotwords = () => {
  return wxRequest({
    url: apiUrl + 'recommend'
  }, {
    loading: false,
    navLoading: true
  })
}


/**
 * 搜索热搜
 */
request.searchKeyword = keyword => {
  return wxRequest({
    url: apiUrl + 'search_by_keyword',
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
    url: apiUrl + 'historydata_by_desc',
    method: 'POST',
    data: {
      desc
    }
  })
}

/**
 * 历史数据
 * _id [_id1, _id2, ...]
 * 
 */
request.fetchHistoryDataById = _id => {
  return wxRequest({
    url: apiUrl + 'historydata_by_id',
    method: 'POST',
    data: {
      _id
    }
  })
}

/**
 * 排行榜 
 * type: 'week' | 'month' | 'all'
 */
request.fetchLeadBoard = type => {
  return wxRequest({
    url: apiUrl + 'leadboard',
    method: 'GET',
    data: {
      type
    }
  })
}

/**
 * commit log
 * type: "front" | "end"
 */
request.fetchCommitLog = type => {
  return wxRequest({
    url: apiUrl + 'commitlog',
    method: 'GET',
    data: {
      type
    }
  })
}

export default request
