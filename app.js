//app.js
App({
  // 系统信息
  systemInfo: {
    height: 555,
    width: 375,
    rpxRatio: 2
  },
  onLaunch() {
    this.initSystemInfo()
  },
  onError(err) {
    console.log('appErr: ', err)
  },
  // 初始化设备信息
  initSystemInfo() {
    const { 
      windowHeight, 
      windowWidth
    } = wx.getSystemInfoSync()
    this.systemInfo = {
      height: windowHeight,
      width: windowWidth,
      rpxRatio: 750 / windowWidth
    }
  },
})