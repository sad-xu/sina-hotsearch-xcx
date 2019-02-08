// pages/search/search.js


Page({
  data: {
    placeHolder: '搜索',
    inputValue: '',
  },
  onLoad(options) {

  },
  // 搜索框得焦 
  bindFocus(e) {
    console.log('focus:', e)
    if (!e.detail.value.length) {
      this.setData({
        placeHolder: ''
      })
    }
  },
  // 输入框失焦
  bindBlur(e) {
    console.log('blur:', e)
    if (!e.detail.value.length) {
      this.setData({
        placeHolder: '搜索'
      })
    }
  },
  // 搜索框输入
  bindInput(e) {
    console.log('input:', e)
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 搜索框搜索
  bindConfirm(e) {
    console.log('confirm:', e)
  }
})
