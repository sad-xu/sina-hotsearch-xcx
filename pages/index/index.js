// pages/index/index.js

import { 
  get_realtime_hot,
  search_keyword
} from '../../utils/request.js'

let lastTop = 0
let lastTime = new Date().getTime()
let scrollSpeed = 0  // 滚动速度 上 - 下 +
let scrollFlag = true

let touchStartTop = 0,
    touchEndTop = 0;



Page({
  data: {
    status: 'loading',
    hotList: [],
    // 搜索相关
    searchWord: '',
    placeholderText: '搜索热搜关键词',
    showModal: false,  // 输入框得焦，背景虚化
    keywordList: [],   // 查询得到的列表
  },
  onLoad: function () {
    // this.getLatestData()
  },
  onPullDownRefresh: function() {
    if (this.data.showModal) return wx.stopPullDownRefresh()
    // this.getLatestData()
    //   .then(() => {
    //     wx.stopPullDownRefresh()
    //   })
  },
  onPageScroll({ scrollTop }) {
    scrollSpeed = (scrollTop - lastTop) / (new Date().getTime() - lastTime) * 1000
    lastTop = scrollTop
    // console.log(scrollSpeed)
  //   if (scrollFlag) {
  //     if (scrollTop > 0 && scrollTop < 10) {
  //       scrollFlag = false
  //       wx.pageScrollTo({
  //         scrollTop: 0,
  //         complete: () => { scrollFlag = true }
  //       })
  //     } else if (scrollTop > 40 && scrollTop < 50) {
  //       scrollFlag = false
  //       wx.pageScrollTo({
  //         scrollTop: 50,
  //         complete: () => { scrollFlag = true }
  //       })
  //     }
  //   }
  //   console.log(scrollSpeed)
  },
  touchStart(e) {
    touchStartTop = e.touches[0].pageY - e.touches[0].clientY
  },
  touchMove(e) {
    // console.log(e)
  },
  touchEnd(e) {
    let endTop = e.changedTouches[0].pageY - e.changedTouches[0].clientY
    // console.log(endTop, lastTop)
    if (endTop > 0 && endTop < 10) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else if (endTop > 40 && endTop < 50) {
      wx.pageScrollTo({
        scrollTop: 50
      })
    } else if (endTop >= 10 && endTop <= 40) {
      if (scrollSpeed > 0) {
        wx.pageScrollTo({
          scrollTop: 50
        })
      } else {
        wx.pageScrollTo({
          scrollTop: 0
        })
      }
    }
  },
  // 获取实时热搜
  getLatestData() {
    return get_realtime_hot().then(resList => {
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
      showModal: true,
      placeholderText: ''
    })
  },
  // 取消
  cancleInput(e) {
    this.setData({
      showModal: false,
      placeholderText: '搜索热搜关键词'
    })
  },
  // 输入 - 推荐相关热点 
  bindInput(e) {
    console.log(e.detail.value)
    let keyword = e.detail.value.trim()
    if (keyword.length) {
      search_keyword(keyword).then(list => {
        console.log(list)
        this.setData({
          keywordList: list
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.setData({
        keywordList: []
      })
    }
  },
  // 搜索
  bindConfirm(e) {
    console.log(e.detail.value)
  }
})

