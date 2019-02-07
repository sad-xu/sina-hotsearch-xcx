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

// TODO: 加虚线


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
  // init desc     'desc1,desc2,desc3...'
  initDesc(desc) {
    // desc = '王思聪,知否知否'
    request.fetchHistoryDataByDesc(desc.split(',')).then(res => {
      let chartData = []
      // 生成x轴数据 遍历所有数据的时间，得到所有数据的时间列表xAxisData
      let xAxisData= new Set()
      res.forEach(line => {
        line.timeline.forEach(item => {
          xAxisData.add(item.t)
        })
      })
      xAxisData = Array.from(xAxisData).sort((a, b) => a - b)
      let xAxisMap = {}  // 映射
      xAxisData.forEach((t, i) => {
        xAxisMap[t] = i
      })
      // 生成y轴数据
      res.forEach(line => {
        let yAxisdata = Array.from({ length: xAxisData.length }) // [undefined, ...]
        let timeline = line.timeline, desc = line.desc
        timeline.forEach(item => {
          yAxisdata[xAxisMap[item.t]] = item.n
        })
        chartData.push({
          name: desc,
          type: 'line',
          showSymbol: false,
          data: yAxisdata
        })
      })
      this.drawChart(chartData, xAxisData)
    }).catch(err => console.log(err))
  },
  // draw chart 
  drawChart(chartData, xAxisData) {
    console.log(chartData, xAxisData)
    let startValue = null, endValue = null  // 初始范围
    // if (chartData.length > 100) {
    //   startValue = chartData.length - 101
    //   endValue = chartData.length - 1
    // }
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
        // 有bug https://github.com/ecomfe/echarts-for-weixin/issues/447
        tooltip: {  
          show: true,
          trigger: 'axis',
          renderMode: 'richText',
          // confine: true,  
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
          data: xAxisData.map(time => new Date(time * 1000 + 28800000).toISOString().slice(0, 16).replace('T', '\n')),
          splitLine: {
            show: false
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            formatter(value, index) {
              if (index === 0) return value
              else return value.slice(5)
            }
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
      // 图例变化事件  至少保留一个图例
      chart.on('legendselectchanged', function(params) {
        if (Object.values(params.selected).every(item => item === false)) {
          params.selected[params.name] = true
          this.setOption({
            legend: {
              selected: params.selected
            }
          })
        }
      })
      return chart
    })
  },
})
