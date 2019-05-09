// pages/index/index.js
import request from '../../utils/request.js'
import tipArr from '../../utils/tips.js'

const app = getApp()

Page({
  data: {
    updateTime: '',
    hotList: [],  // [{desc, n}]
    tip: tipArr[Math.floor(Math.random() * tipArr.length)],
    nodata: false
  },
  onLoad() {
    this.init()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.init(false).then(() => {
      wx.stopPullDownRefresh()
    }).catch(err => {
      wx.stopPullDownRefresh()
    })
  },
  // 初始化 获取实时热搜列表 
  init(isLoading) {
    return request.fetchRealtimeHotwords(isLoading).then(res => {
      if (res && res.data.length) {
        this.setData({
          hotList: res.data,
          updateTime: new Date(res.time * 1000).toTimeString().slice(0, 5)
        })
      } else {
        this.setData({
          nodata: true
        })
      }
    }).catch(err => {
      this.setData({
        nodata: true
      })
      console.log(err)
    })
  },
  // 跳转到详情页
  jumpToDetail(e) {
    let desc = e.currentTarget.dataset.desc
    wx.navigateTo({
      url: `../analysis/analysis?type=desc&desc=${desc}`
    })
  },
  // 分享
  onShareAppMessage() {
    return {
      title: '热搜分析师',
      imageUrl: '/assets/share-6.jpg'
    }
  }
})

