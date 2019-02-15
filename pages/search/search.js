// pages/search/search.js
import request from '../../utils/request.js'
// const app = getApp()

let timer  // 去抖定时器id

Page({
  data: {
    // 单条高度  -- 不同设备 底部统一留白100rpx
    // itemHeight: (app.systemInfo.height * app.systemInfo.rpxRatio - 180 - 100) / 10 / app.systemInfo.rpxRatio,
    // maxHeight: Math.ceil((1 - 280 / (app.systemInfo.height * app.systemInfo.rpxRatio)) * 100),
    placeHolder: '搜索',
    inputValue: '',
    showSearch: false, // 搜索结果 : 推荐列表
    searchList: [],  // 搜索结果  [{_id, desc}, ]
    recommendList: [], // 推荐列表
    chosedList: [], // 已选项      [{_id, desc}]
    chosedMap: {}, // 已选项的映射 {_id: desc}
  },
  onLoad() {
    this.initRecommend()    
  },
  // 推荐热搜
  initRecommend() {
    request.fetchRecommendHotwords().then(res => {
      this.setData({
        recommendList: res
      })
    }).catch(err => console.log(err))
  },
  // 搜索框得焦 
  bindFocus(e) {
    if (!e.detail.value.length) {
      this.setData({
        placeHolder: ''
      })
    }
  },
  // 输入框失焦
  bindBlur(e) {
    if (!e.detail.value.length) {
      this.setData({
        placeHolder: '搜索'
      })
    }
  },
  // 搜索框输入
  bindInput(e) {
    let inputValue = e.detail.value
    this.setData({
      inputValue: inputValue
    })
    if (inputValue.trim().length) {  // 有输入 调接口 + debounce
      const that = this 
      if (timer) clearTimeout(timer)
      timer = setTimeout(function () {
        timer = null
        request.searchKeyword(inputValue.trim()).then(res => {
          if (res.length) {
            that.setData({
              showSearch: true,
              searchList: res
            })
          }
        }).catch(err => console.log(err))
      }, 300)
    } else { // 无输入  清空
      this.setData({
        showSearch: false
      })
    }
  },
  // 搜索框搜索 - 无意义
  bindConfirm(e) {
    console.log('confirm:', e)
  },
  // 选中某一事件 - 跳转到单条详情页
  selectEvent(e) {
    wx.navigateTo({
      url: `../analysis/analysis?type=_id&_id=${e.target.dataset._id}`
    })
  },
  // icon事件 - 添加
  iconAdd(e) {
    let {_id, desc} = e.target.dataset
    if (!this.data.chosedMap[_id]) {
      if (this.data.chosedList.length >= 6) {  // 上限6个
        wx.showToast({
          title: '亲亲,这边最多同时分析6条热搜呢',
          icon: 'none'
        })
      } else {
        let str = `chosedMap.${_id}`
        let chosedList = this.data.chosedList
        chosedList.push({ _id, desc })
        this.setData({
          [str]: desc,
          chosedList: chosedList
        })
      }
    }
  },
  // icon事件 - 移除
  iconRemove(e) {
    let { _id } = e.target.dataset
    if (this.data.chosedMap[_id]) {
      let str = `chosedMap.${_id}`
      let chosedList = this.data.chosedList.reduce((acc, item) => {
        if (item._id === _id) return acc
        else return (acc.push(item), acc)
      }, [])
      this.setData({
        [str]: null,
        chosedList: chosedList
      })
    }
  },
  // 开始分析
  startAnalyse() {
    let idStr = this.data.chosedList.map(item => item._id).join(',')
    wx.navigateTo({
      url: `../analysis/analysis?type=_id&_id=${idStr}`
    })
  }
})
