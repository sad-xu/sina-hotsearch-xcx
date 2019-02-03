// pages/index/index.js
import request from '../../utils/request.js'
import util from '../../utils/util.js'

const app = getApp()

Page({
  data: {
    updateTime: '',
    hotList: [],  // [{desc, n}]
    scrollHeight: app.systemInfo.height - 50 / app.systemInfo.rpxRatio
  },
  onLoad() {
    this.init()
  },
  // 初始化 获取实时热搜列表 
  init() {
    request.fetchRealtimeHotwords().then(res => {
      this.setData({
        hotList: res.data,
        updateTime: new Date(res.time * 1000).toTimeString().slice(0, 5)
      })
    }).catch(err => console.log(err))
  }
})

