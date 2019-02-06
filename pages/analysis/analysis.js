// pages/analysis/analysis.js
import * as echarts from '../../components/ec-canvas/echarts'
import request from '../../utils/request.js'

/**
 * 分析详情页
 * case1: [desc1, desc2, ...]  首页根据关键词查询  
 * 
 * case2: [_id1, _id2, ...]  搜索页根据_id查询
 * 
 */
// console.log(echarts)

let pageOption = {}

Page({
  data: {
    ec: {
      // onInit: initChart
      lazyLoad: true 
    }
  },
  onLoad(option) {
    pageOption = option
  },
  onReady: function () {
    this.ecComponent = this.selectComponent('#mychart-dom-line')
    let {type, desc} = pageOption
    if (type === 'desc') {
      this.initDesc(desc)
    } else if (type === '_id') {

    }
  },
  // init desc
  initDesc(desc) {
    request.fetchHistoryDataByDesc(desc.split(',')).then(res => {
      console.log(res)
      let chartData = [], xAxisData = []
      res.forEach(line => {
        let timeline = line.timeline, desc = line.desc
        chartData.push({
          name: desc,
          type: 'line',
          showSymbol: false,
          data: timeline.map(item => {
            xAxisData.push(item.t)
            return [item.t, item.n]
          })
        })
      })
      // res.forEach(line => {
      //   let timeline = line.timeline, desc = line.desc
      //   // 先分段
      //   let timeQuantum = []
      //   timeline.forEach((point, index) => {
      //     let t = point.t * 1000, 
      //         n = point.n,
      //         lastTime = index === 0 ? 0 : timeline[index - 1].t * 1000
      //     if (t - lastTime > 43200000) {  // 分段  间隔大于12小时
      //       timeQuantum.push([[t, n]])
      //     } else {  // 正常
      //       timeQuantum[timeQuantum.length - 1].push([t, n])
      //     }
      //   })
      //   // 
      //   timeQuantum.forEach(item => {
      //     chartData.push({
      //       name: desc,
      //       type: 'line',
      //       showSymbol: false,
      //       data: item
      //     })
      //   })
      //   console.log(timeQuantum)
      // })
      this.drawChart(chartData)
    }).catch(err => console.log(err))
  },
  // draw chart 
  drawChart(chartData, xAxisData) {
    let startValue = null, endValue = null  // 初始范围
    if (chartData.length > 100) {
      startValue = chartData.length - 101
      endValue = chartData.length - 1
    }

    this.ecComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      chart.setOption({
        title: {
          show: false
        },
        legend: {
          top: 0,
          z: 100
        },
        grid: {
          left: 10,
          top: 40,
          right: 10,
          bottom: 40,
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        dataZoom: [{
          type: 'inside',
          startValue: startValue,
          endValue: endValue,
          minSpan: 1
        }, {
          type: 'slider',
          startValue: startValue,
          endValue: endValue,
          minSpan: 1
        }],
        xAxis: {
          type: 'category',
          // data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          // name: '热度',
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: (v, i) => {
              if (v === 0) return 0
              else return `${ v / 1000 }k` 
            }
          }
        },
        series: chartData
      })
      return chart
    })
  },
})
