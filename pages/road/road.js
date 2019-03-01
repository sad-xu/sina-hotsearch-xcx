// pages/road/road.js
Page({
  data: {
    selectedIndex: -1,
    detailData: [{
      title: '2019 三部曲',
      projects: [{
        name: 'Hotsearch Analyst',
        url: '',
        desc: [
          '私有库，热搜分析师',
          '前端：小程序',
          '后端：nodejs + express + mongodb + redis'
        ]
      }, {
        name: 'Tracker',
        url: 'https://github.com/sad-xu/tracker',
        desc: [
          '前端代码埋点库 + 统计后台示例',
          '开发中...'
        ]
      }, {
        name: '保密',
        url: '',
        desc: ['保密']
      }]
    }, {
      title: '2018 四部曲',
      projects: [{
        name: 'SCP',
        url: 'https://github.com/sad-xu/SCP',
        desc: [
          '首个成功的个人项目',
          '前端：移动端页面 + PC端管理后台',
          '后端：nodejs + express + mongodb'
        ]
      }, {
        name: 'Team Chat',
        url: 'https://github.com/sad-xu/teamchat',
        desc: [
          '私人定制聊天及管理项目',
          '前端：管理后台',
          '后端：nodejs + express + mongodb'
        ]
      }, {
        name: 'Graduation Project',
        url: 'https://github.com/sad-xu/Graduation-Project',
        desc: [
          '无人指导的毕业设计',
          '用js实现神经网络识别手写字母',
        ]
      }, {
        name: 'Require Map',
        url: 'https://github.com/sad-xu/require-map',
        desc: [
          '首个工具类npm包',
          '自动生成nodejs项目中各个文件的依赖关系图'
        ]
      }]
    }, {
      title: '2017 初学者之路',
      projects: [{
        name: '2017 IFE',
        url: 'https://github.com/sad-xu/2017-baidu',
        desc: ['自学网站']
      }, {
        name: 'Free Code Camp',
        url: 'https://github.com/sad-xu/free-code-camp',
        desc: ['自学网站']
      }, {
        name: 'Vue Sellfood',
        url: 'https://github.com/sad-xu/vue-sellfood',
        desc: ['慕课网项目']
      }]
    }]
  },
  selectItem(e) {
    let index = e.currentTarget.dataset.index
    index = index === this.data.selectedIndex ? -1 : index
    this.setData({
      selectedIndex: index 
    })
  },
  jumpToWeb(e) {
    let url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: '../webview/webview?url=' + url,
      })
    }
  },
  onShareAppMessage() {
    return {
      title: '热搜分析师 - 开发之路',
      imageUrl: '/assets/share-1.jpg'
    }
  }
})