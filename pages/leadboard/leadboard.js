// pages/leadboard/leadboard.js
import request from '../../utils/request.js'

let allData = {  // 全部数据
  week: null, // {update: '', data: []}
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
    listData: []
  },
  onLoad() {
    this.init(this.data.typeList[this.data.selectedIndex].type)
  },
  init(type) {
    if (!allData[type]) { // 无数据 请求
      request.fetchLeadBoard(type).then(res => {
        if (res) {
          allData[type] = res
          this.setData({
            update: res.update,
            listData: res.data
          })
        }
      })
    } else {  // 有数据
      this.setData({
        update: allData[type].update,
        listData: allData[type].data
      })
    }
  },
  bindChangeType(e) {
    let { type, index } = e.currentTarget.dataset
    this.setData({
      selectedIndex: index
    })
    this.init(type)
  }
})
