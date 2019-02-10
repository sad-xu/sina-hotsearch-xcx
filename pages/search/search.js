// pages/search/search.js
import request from '../../utils/request.js'

// const app = getApp()

/**
 * TODO:
 *  1. chart 多个图例怎么弄
 *  2. 搜索，推荐接入真正的接口
 *  3. 搜索debounce实现
 *  4. 首页样式优化
 *  5. tarbar图片
 *  6. 未来页 放什么
 *  7. 用户token 
 */


// Mock Data
let recommendList = [
  { "_id": "5c387988e019dacd5a05a8d4", "desc": "假装还有金粉的蔡徐坤" }, 
  { "_id": "5c4336c0e019dacd5a05aca9", "desc": "吴昕徐海乔配一脸" }, 
  { "_id": "5c596800e019dacd5a05b5c2", "desc": "外星人是徐峥演的" }, 
  { "_id": "5c3b54c8e019dacd5a05a9d1", "desc": "导演徐涵diss王源粉丝" }, 
  { "_id": "5c3be294e019dacd5a05a9ee", "desc": "导演徐涵删博" }, 
  { "_id": "5c3bcc50e019dacd5a05a9dd", "desc": "导演徐涵向王源道歉" }, 
  { "_id": "5c3c0814e019dacd5a05aa05", "desc": "徐光胜" }
]

let searchList = [
  { "_id": "5c3d4350e019dacd5a05aa7b", "desc": "MACx王者荣耀" },
  { "_id": "5c2a5b78e019dacd5a05a326", "desc": "三亚偶遇王思聪" },
  { "_id": "5c37d1f4e019dacd5a05a87d", "desc": "中国萌娃请愿英国女王" },
  { "_id": "5c3bfa04e019dacd5a05a9fa", "desc": "信小呆 锦鲤大王" },
  { "_id": "5c54f040e019dacd5a05b38b", "desc": "吴秀波王牌画面被全删" },
  { "_id": "5c3af384e019dacd5a05a9a5", "desc": "周杰伦赞王嘉尔改编版安静" },
  { "_id": "5c5450e0e019dacd5a05b35a", "desc": "国王杯皇马遭遇巴萨" },
  { "_id": "5c3b54c8e019dacd5a05a9d1", "desc": "导演徐涵diss王源粉丝" },
  { "_id": "5c3bcc50e019dacd5a05a9dd", "desc": "导演徐涵向王源道歉" },
  { "_id": "5c336e20e019dacd5a05a6c8", "desc": "小智喷王思聪" }
]

Page({
  data: {
    // 单条高度  -- 不同设备 底部统一留白100rpx
    // itemHeight: (app.systemInfo.height * app.systemInfo.rpxRatio - 180 - 100) / 10 / app.systemInfo.rpxRatio,
    // maxHeight: Math.ceil((1 - 280 / (app.systemInfo.height * app.systemInfo.rpxRatio)) * 100),
    placeHolder: '关键词搜索',
    inputValue: '',
    showSearch: false, // 搜索结果 : 推荐列表
    searchList: [],  // 搜索结果  [{_id, desc}, ]
    recommendList: [], // 推荐列表
    chosedList: [], // 已选项      [{_id, desc}]
    chosedMap: {}, // 已选项的映射 {_id: desc}
  },
  onLoad(options) {
    // 取推荐数据
    this.setData({
      recommendList: recommendList
    })
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
        placeHolder: '关键词搜索'
      })
    }
  },
  // 搜索框输入
  bindInput(e) {
    console.log('input:', e)
    let inputValue = e.detail.value
    this.setData({
      inputValue: inputValue
    })
    if (inputValue.trim().length) {  // 有输入 调接口 + debounce
      // request.searchKeyword('徐').then(res => {
      //   if (res.length) {
          this.setData({
            showSearch: true,
            searchList: [
              { "_id": "5c3d4350e019dacd5a05aa7b", "desc": "MACx王者荣耀" },
              { "_id": "5c2a5b78e019dacd5a05a326", "desc": "三亚偶遇王思聪" },
              { "_id": "5c37d1f4e019dacd5a05a87d", "desc": "中国萌娃请愿英国女王" },
              { "_id": "5c3bfa04e019dacd5a05a9fa", "desc": "信小呆 锦鲤大王" },
              { "_id": "5c54f040e019dacd5a05b38b", "desc": "吴秀波王牌画面被全删" },
              { "_id": "5c3af384e019dacd5a05a9a5", "desc": "周杰伦赞王嘉尔改编版安静" },
              { "_id": "5c5450e0e019dacd5a05b35a", "desc": "国王杯皇马遭遇巴萨" },
              { "_id": "5c3b54c8e019dacd5a05a9d1", "desc": "导演徐涵diss王源粉丝" },
              { "_id": "5c3bcc50e019dacd5a05a9dd", "desc": "导演徐涵向王源道歉" },
              { "_id": "5c336e20e019dacd5a05a6c8", "desc": "小智喷王思聪" }
            ]
          })
      //   }
      // }).catch(err => console.log(err))
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
          title: '最多添加6个热点',
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
