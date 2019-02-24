// pages/more/more.js

Page({
  data: {
    entries: [{
      name: '排行榜',
      url: '../leadboard/leadboard',
      icon: ''
    }, {
      name: 'Commit Log',
      url: '../commitlog/commitlog',
      icon: ''
    }],

  },
  jumpTo(e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url
    })
  }
})