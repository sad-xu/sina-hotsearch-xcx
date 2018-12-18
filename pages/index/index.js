// pages/index/index.js

import request from '../../utils/request'

Page({
  data: {
    status: 'loading',
    hotList: [],
    // 搜索相关
    searchWord: '',
    showModal: false,  // 输入框得焦，背景虚化，
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
      }, function() {
        // wx.pageScrollTo({
        //   scrollTop: 40,
        //   duration: 300
        // })
      })
    }).catch(err => {
      console.log(err)
      this.setData({
        status: 'error'
      })
    })
  },
  /* 搜索相关 */
  // 得焦
  bindFocus(e) {
    console.log('focus')
    this.setData({
      showModal: true
    })
  },
  // 取消
  cancleInput(e) {
    this.setData({
      showModal: false
    })
  },
  // 输入 - 推荐相关热点 
  bindInput(e) {
    console.log(e.detail.value)
  },
  // 搜索
  bindConfirm(e) {
    console.log(e.detail.value)
  }
})

