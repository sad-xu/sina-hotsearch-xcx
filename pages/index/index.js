// pages/index/index.js
import request from '../../utils/request.js'
// import util from '../../utils/util.js'

const app = getApp()

const tipArr = [
  '人是会思考的芦苇',
  '1212121',
  'rrrrrrr'
]

Page({
  data: {
    updateTime: '',
    hotList: [],  // [{desc, n}]
    tip: tipArr[Math.floor(Math.random() * tipArr.length)]
    // scrollHeight: app.systemInfo.height - 50 / app.systemInfo.rpxRatio
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
  },
  // 跳转到详情页
  jumpToDetail(e) {
    let desc = e.currentTarget.dataset.desc
    wx.navigateTo({
      url: `../analysis/analysis?type=desc&desc=${desc}`
    })
  },
})

