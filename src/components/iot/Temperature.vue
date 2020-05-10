<template>
  <div>
    <el-row>
      <el-col :span="16">
        <div id="main" style="width: 850px;height:500px;"></div>
      </el-col>

      <el-col :span="8">
        <el-row :gutter="8">
          <el-col :span="7">
            <div class="grid-content bg-purple">Start/Stop</div>
          </el-col>
          <el-col :span="1.5">
            <div class="grid-content bg-purple-light">
              <el-switch
                v-model="run"
                @change="runStop"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 全局引入echarts
import echarts from 'echarts'

export default {
  data() {
    return {
      time: [],
      data: [],
      myChart: null,
      run: false,
      timerId: null
    }
  },

  mounted() {
    this.drawChart()

    Date.prototype.format = function(fmt) {
      var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      }

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
        }
      }

      return fmt
    }
  },

  destroyed() {
    clearInterval(this.timerId)
  },

  created() {
    for (var i = 0; i < 100; i++) {
      // this.addData()
    }
  },

  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('main'))
      this.myChart = myChart
      //指定图表的配置项和数据
      let option = {
        title: {
          text: '温升测试'
        },
        legend: {
          orient: 'vertical',
          x: 'left', //可设定图例在左、右、居中
          y: 'center', //可设定图例在上、下、居中
          data: [
            't1',
            't2',
            't3',
            't4',
            't5',
            't6',
            't7',
            't8',
            't9',
            't10',
            't11',
            't12',
            't13',
            't14',
            't15',
            't16'
          ]
        },
        xAxis: {
          type: 'category', // 还有其他的type，可以去官网喵两眼哦
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // x轴数据
          name: 'time', // x轴名称
          splitLine: {
            show: true
          },
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 400,
            fontSize: 14
          },
          axisLabel: {
            interval: 5,
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          name: 'degree', // y轴名称
          // y轴名称样式
          nameTextStyle: {
            fontWeight: 400,
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis' // axis   item   none三个值
        },
        series: [
          {
            name: 't1',
            data: [],
            type: 'line'
          },
          {
            name: 't2',
            data: [],
            type: 'line'
          },
          {
            name: 't3',
            data: [],
            type: 'line'
          },
          {
            name: 't4',
            data: [],
            type: 'line'
          },
          {
            name: 't5',
            data: [],
            type: 'line'
          },
          {
            name: 't6',
            data: [],
            type: 'line'
          },
          {
            name: 't7',
            data: [],
            type: 'line'
          },
          {
            name: 't8',
            data: [],
            type: 'line'
          },
          {
            name: 't9',
            data: [],
            type: 'line'
          },
          {
            name: 't10',
            data: [],
            type: 'line'
          },
          {
            name: 't11',
            data: [],
            type: 'line'
          },
          {
            name: 't12',
            data: [],
            type: 'line'
          },
          {
            name: 't13',
            data: [],
            type: 'line'
          },
          {
            name: 't14',
            data: [],
            type: 'line'
          },
          {
            name: 't15',
            data: [],
            type: 'line'
          },
          {
            name: 't16',
            data: [],
            type: 'line'
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },

    refreshTime: function(shift) {
      var now = new Date()
      var nowStr = now.format('yyyy-MM-dd hh:mm:ss')

      this.time.push(nowStr)

      if (shift) {
        this.time.shift()
      }
    },

    runStop: function(run) {
      if (run) {
        var that = this
        this.timerId = setInterval(function() {
          that.refreshTime(false)

          var option = that.myChart.getOption()
          var seriesData = option.series
          for (var i = 0; i < seriesData.length; i++) {
            seriesData[i].data.push(Math.random() * 100)
          }

          that.myChart.setOption({
            xAxis: {
              data: that.time
            },

            series: seriesData
          })
        }, 2000)
      } else {
        // 保存测试数据到本地

        clearInterval(this.timerId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: left;
  justify-content: space-around;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
  color: black;
}
.bg-purple-light {
  background: #bec3ce;
}
</style>
