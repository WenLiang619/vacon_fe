<template>
  <div>
    <el-row>
      <el-col :span="14">
        <div id="main" style="width: 850px;height:500px;"></div>
      </el-col>

      <el-col :span="10">
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
                :disabled="disable"
              ></el-switch>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="8">
          <el-col :span="7">
            <div class="grid-content bg-purple">扫描周期(s)</div>
          </el-col>
          <el-col :span="8">
            <!-- <div class="grid-content bg-purple-light"> -->
            <el-input
              onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
              onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
              min="2"
              v-model="cycleTime"
              placeholder="请输入扫描周期"
            ></el-input>
            <!-- </div> -->
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
      timerId: null,
      cycleTime: '',
      disable: true
    }
  },

  created() {
    // for (var i = 0; i < 100; i++) {
    //   // this.addData()
    // }
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

        legend: [
          {
            // icon: 'bar',
            orient: 'vertical',
            x: 'left', //可设定图例在左、右、居中
            y: 'center', //可设定图例在上、下、居中
            textStyle: {
              // color: '#B8B6B8'
            },
            data: ['qq', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10'],
            x: 'left'
          },
          {
            // icon: 'bar',
            orient: 'vertical',
            x: 'left', //可设定图例在左、右、居中
            y: 'center', //可设定图例在上、下、居中
            textStyle: {
              // color: '#B8B6B8'
            },
            data: [
              't11',
              't12',
              't13',
              't14',
              't15',
              't16',
              't17',
              't18',
              't19',
              't20'
            ],
            x: 'right'
          }
        ],

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
            interval: 0,
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
            name: 'qq',
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
          },
          {
            name: 't17',
            data: [],
            type: 'line'
          },
          {
            name: 't18',
            data: [],
            type: 'line'
          },
          {
            name: 't19',
            data: [],
            type: 'line'
          },
          {
            name: 't20',
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
      console.log(this.cycleTime)
      console.log(run) // 开关开了就是 true 否则就是false
      if (run) {
        this.timerId = setInterval(() => {
          this.refreshTime(false)

          var option = this.myChart.getOption()
          var seriesData = option.series
          for (var i = 0; i < seriesData.length; i++) {
            seriesData[i].data.push(Math.random() * 100)
          }

          this.myChart.setOption({
            xAxis: {
              data: this.time
            },

            series: seriesData
          })
        }, parseInt(this.cycleTime) * 1000)
      } else {
        // 保存测试数据到本地

        clearInterval(this.timerId)
      }
    }

    // runStop2: function(run) {
    //   if (run && !this.timerId) {
    //     this.timerId = setTimeout(() => {
    //       console.log(this)
    //       this.refreshTime(false)

    //       var option = this.myChart.getOption()
    //       var seriesData = option.series
    //       for (var i = 0; i < seriesData.length; i++) {
    //         seriesData[i].data.push(Math.random() * 100)
    //       }

    //       this.myChart.setOption({
    //         xAxis: {
    //           data: this.time
    //         },

    //         series: seriesData
    //       })
    //     }, 2000)
    //   } else {
    //     console.log(this.timerId)
    //     clearTimeout(this.timerId)
    //     alert('over')
    //   }
    // },
  },

  watch: {
    // 监视 cycleTime 的改变，当 cycleTime 发生变化的时候做业务定制处理
    // 引用类型只能监视一层，无法监视内部成员的子成员的改变
    cycleTime: {
      // 当监视到 cycleTime 改变的时候会自动调用 handler 方法
      // 你监视的谁，val 就是谁
      // val 的变化之后的最新值
      // oldVal 是变化之前的值
      handler(val, oldVal) {
        // 监视到 cycleTime 变化，把 cycleTime 本次存储记录数据的状态
        // 这里既可以通过 this.cycleTime 来访问，也可以通过 val 来得到最新的 cycleTime

        console.log('haha')
        console.log(oldVal)
        console.log(val)
        if (val && oldVal && val != oldVal) {
          console.log('YY')
          this.run = false
          clearInterval(this.timerId)
        } else if (val && !oldVal) {
          this.disable = false
          console.log('huhu')
        } else {
          console.log('OKKK')
        }
      },
      deep: true, // 深度监视，只有这样才能监视到数组或者对象孩子...孩子... 成员的改变
      immediate: true // 无乱变化与否，你上来就给我调用一次，如何使用看需求
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
