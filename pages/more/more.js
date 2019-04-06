// pages/more/more.js

let tapNum = wx.getStorageSync('tapflag') ? 20 : 0

Page({
  data: {
    entries: [{
      name: '最热搜',
      url: '../leadboard/leadboard',
      icon: ''
    }, {
      name: '更新记录',
      url: '../commitlog/commitlog',
      icon: ''
    }, {
      name: '开发之路',
      url: '../road/road',
      icon: ''
    }],
  },
  jumpTo(e) {
    let url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: url
      })
    }
  },
  // 路由像是和空间固定在了一起，纹丝不动
  versionTap() {
    tapNum += 1
    if (tapNum === 20) {
      wx.showToast({ title: '好像触发了某处机关', icon: 'none' })
      wx.setStorageSync('tapflag', true)
    }
  },
  // 分享
  onShareAppMessage() {
    return {
      title: '热搜分析师',
      imageUrl: '/assets/share-4.jpg'
    }
  }
})