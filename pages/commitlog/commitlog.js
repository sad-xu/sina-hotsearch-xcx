// pages/commitlog/commitlog.js
import request from '../../utils/request.js'

let allData = {
  back: null, // { update: '', data: [{time, msg}]}
  front: null
}

Page({
  data: {
    selectedIndex: 0,
    typeList: [
      { text: '后端', type: 'back' },
      { text: '前端', type: 'front' }
    ],
    update: '',
    listData: []
  },
  onLoad() {
    this.init(this.data.typeList[this.data.selectedIndex].type)
  },
  init(type) {
    if (!allData[type]) { // 无数据 请求
      request.fetchCommitLog(type).then(res => {
        if (res) {
          let update = res.update
          let list = res.data.map(item => {
            return { // 2019-01-02 
              time: new Date(new Date(item.date).getTime() + 28800000).toISOString(),  
              msg: item.msg
            }
          })
          allData[type] = {
            update: update,
            data: list
          }
          this.setData({
            update: update,
            listData: list
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