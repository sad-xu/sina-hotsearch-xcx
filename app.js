//app.js

/**
 * TODO:
 *  1. chart 多个图例怎么弄      √
 *  2. 搜索，推荐接入真正的接口   √
 *  3. 搜索debounce实现         √
 *  4. 首页样式优化
 *  5. tarbar图片
 *  6. 未来页 放什么  '疯言疯语'
 *  7. 用户token
 *  8. 彩蛋
 */

App({
  // 系统信息
  // systemInfo: {
  //   height: 555,
  //   width: 375,
  //   rpxRatio: 2
  // },
  onLaunch() {
    // this.initSystemInfo()
  },
  onError(err) {
    console.log('appErr: ', err)
  },
  // 初始化设备信息
  // initSystemInfo() {
  //   const { 
  //     windowHeight, 
  //     windowWidth
  //   } = wx.getSystemInfoSync()
  //   this.systemInfo = {
  //     height: windowHeight,
  //     width: windowWidth,
  //     rpxRatio: 750 / windowWidth
  //   }
  // },
})
