// pages/index/index.js

import request from '../../utils/request'

Page({
  data: {
    status: 'loading',
    hotList: []
  },
  onLoad: function () {
    this.getLatestData()
  },
  onPullDownRefresh: function() {
    this.getLatestData()
      .then(() => {
        wx.stopPullDownRefresh()
      })
  },
  // 获取实时热搜
  getLatestData() {
    return request.getRealtimeHot().then(resList => {
      console.log(resList)
      this.setData({
        status: resList.length ? 'rendering' : 'error',
        hotList: resList
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        status: 'error'
      })
    })
  }
})

