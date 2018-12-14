// pages/index/index.js

import request from '../../utils/request'

Page({
  data: {
    hotList: []
  },
  onLoad: function () {
    console.log('onload')
  },
  init() {
    request.getRealtimeHot().then(resList => {
      console.log(resList)
      this.setData({
        hotList: resList
      })
    })
  }
})