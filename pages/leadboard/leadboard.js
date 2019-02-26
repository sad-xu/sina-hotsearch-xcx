// pages/leadboard/leadboard.js
import request from '../../utils/request.js'

let allData = {  // 全部数据
  week: null, // { update: 1550938603471, data: [{ desc, n }, ...]}
  month: null,
  all: null
}

Page({
  data: {
    selectedIndex: 0,
    typeList: [
      { text: '周', type: 'week' },
      { text: '月', type: 'month' },
      { text: '全部', type: 'all' },
    ],
    update: '',
    listData: [],
    noData: false
  },
  onLoad() {
    this.init(this.data.typeList[this.data.selectedIndex].type)
  },
  init(type) {
    if (!allData[type]) { // 无数据 请求
      request.fetchLeadBoard(type).then(res => {
        if (res && res.update) {
          allData[type] = res
          this.setData({ // 更新时间取前一天
            update: new Date(res.update - 57600000).toISOString(0, 10),
            listData: res.data
          })
        } else {
          this.setData({
            noData: true
          })
        }
      }).catch(err => {
        this.setData({
          noData: true
        })
      })
    } else {  // 有数据
      this.setData({
        update: allData[type].update,
        listData: allData[type].data
      })
    }
  },
  // 切换类别
  bindChangeType(e) {
    let { type, index } = e.currentTarget.dataset
    this.setData({
      selectedIndex: index
    })
    this.init(type)
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  // 详情跳转
  jumpToDetail(e) {
    let desc = e.currentTarget.dataset.desc
    wx.navigateTo({
      url: `../analysis/analysis?type=desc&desc=${desc}`
    })
  }
})
