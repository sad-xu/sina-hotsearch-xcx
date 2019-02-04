// pages/analysis/analysis.js
import request from '../../utils/request.js'

/**
 * 分析详情页
 * case1: [desc1, desc2, ...]  首页根据关键词查询  
 * 
 * case2: [_id1, _id2, ...]  搜索页根据_id查询
 * 
 */

Page({
  data: {

  },
  onLoad(option) {
    let type = option.type
    if (type === 'desc') {
      this.initDesc(option.desc)
    } else if (type === '_id') {

    }
  },
  // init desc
  initDesc(desc) {
    request.fetchHistoryDataByDesc(desc.split(',')).then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  },
})
