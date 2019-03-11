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
    listData: [],
    nodata: false
  },
  onLoad() {
    this.init(this.data.typeList[this.data.selectedIndex].type)
  },
  init(type) {
    if (!allData[type]) { // 无数据 请求
      request.fetchCommitLog(type).then(res => {
        if (res && res.data.length) {
          let update = new Date(res.update + 28800000).toISOString().slice(0, 10)
          let list = res.data.map(item => {
            let time = new Date(new Date(item.date).getTime() + 28800000).toISOString()
            return { // 2019-01-02 
              time: `${time.slice(0, 10)} ${time.slice(11, 16)}`,  
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
  bindChangeType(e) {
    let { type, index } = e.currentTarget.dataset
    this.setData({
      selectedIndex: index
    })
    this.init(type)
  },
  // 分享
  onShareAppMessage() {
    return {
      title: '热搜分析师 - 提交记录',
      imageUrl: '/assets/share-5.jpg'
    }
  }
})