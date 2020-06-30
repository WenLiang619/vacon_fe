<template>
  <div @click="containerClick">
    <el-row>
      <el-col :span="17">
        <div id="main" style="width: 1050px;height:680px;" @click.stop="echartClick"></div>
      </el-col>

      <el-col :span="7">
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
            <div class="grid-content bg-purple">Sweep Delay(s)</div>
          </el-col>
          <el-col :span="6">
            <!-- <div class="grid-content bg-purple-light"> -->
            <el-input
              onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
              onafterpaste="this.value=this.value.replace(/\D|^0/g,'')"
              min="2"
              v-model="cycleTime"
              placeholder
            ></el-input>
            <!-- </div> -->
          </el-col>
        </el-row>
        <el-row>
          <el-table :data="tableData" height="530" stripe border style="width: 100%">
            <el-table-column type="index" :index="indexMethod"></el-table-column>
            <el-table-column prop="chNo" label="Channel No." width="100"></el-table-column>
            <el-table-column prop="value" label="Value" width="100"></el-table-column>
            <!-- <el-table-column prop="lable" label="Lable" width="100"></el-table-column> -->
            <el-table-column prop label="Edit Lable" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.lable" v-on:input="lableChange(scope.row)"></el-input>
                <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">Edit Lable</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-button type="primary" style="background-color: #0086b3" @click="exportExcel">导出</el-button>
        <el-row v-show="false">
          <el-table id="allDataTable" :data="tableDataForExcel">
            <el-table-column prop="chNo" label="Channel No."></el-table-column>
            <el-table-column prop="lable" label="Lable"></el-table-column>
            <el-table-column v-for="(t, i)  in time" :key="t" prop="value" :label="t">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.value[i] }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column v-for="v in value" :key="v">{{v}}</el-table-column> -->
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 全局引入echarts
import echarts from 'echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      time: [],
      nowStr: '',
      myChart: null,
      run: false,
      timerId: null,
      cycleTime: '',
      disable: true,
      tableData: [
        {
          chNo: 'Ch1',
          value: '0',
          lable: 'Ch1'
        },
        {
          chNo: 'Ch2',
          value: '0',
          lable: 'Ch2'
        },
        {
          chNo: 'Ch3',
          value: '0',
          lable: 'Ch3'
        },
        {
          chNo: 'Ch4',
          value: '0',
          lable: 'Ch4'
        },
        {
          chNo: 'Ch5',
          value: '0',
          lable: 'Ch5'
        },
        {
          chNo: 'Ch6',
          value: '0',
          lable: 'Ch6'
        },
        {
          chNo: 'Ch7',
          value: '0',
          lable: 'Ch7'
        },
        {
          chNo: 'Ch8',
          value: '0',
          lable: 'Ch8'
        },
        {
          chNo: 'Ch9',
          value: '0',
          lable: 'Ch9'
        },
        {
          chNo: 'Ch10',
          value: '0',
          lable: 'Ch10'
        },
        {
          chNo: 'Ch11',
          value: '0',
          lable: 'Ch11'
        },
        {
          chNo: 'Ch12',
          value: '0',
          lable: 'Ch12'
        },
        {
          chNo: 'Ch13',
          value: '0',
          lable: 'Ch13'
        },
        {
          chNo: 'Ch14',
          value: '0',
          lable: 'Ch14'
        },
        {
          chNo: 'Ch15',
          value: '0',
          lable: 'Ch15'
        },
        {
          chNo: 'Ch16',
          value: '0',
          lable: 'Ch16'
        },
        {
          chNo: 'Ch17',
          value: '0',
          lable: 'Ch17'
        },
        {
          chNo: 'Ch18',
          value: '0',
          lable: 'Ch18'
        },
        {
          chNo: 'Ch19',
          value: '0',
          lable: 'Ch19'
        },
        {
          chNo: 'Ch20',
          value: '0',
          lable: 'Ch20'
        }
      ],
      tableDataForExcel: [
        {
          chNo: 'Ch1',
          value: [],
          lable: 'Ch1',
          time: [],
          timeVal: []
        },
        { chNo: 'Ch2', value: [], lable: 'Ch2', time: [], timeVal: [] },
        { chNo: 'Ch3', value: [], lable: 'Ch3', time: [], timeVal: [] },
        { chNo: 'Ch4', value: [], lable: 'Ch4', time: [], timeVal: [] },
        { chNo: 'Ch5', value: [], lable: 'Ch5', time: [], timeVal: [] },
        { chNo: 'Ch6', value: [], lable: 'Ch6', time: [], timeVal: [] },
        { chNo: 'Ch7', value: [], lable: 'Ch7', time: [], timeVal: [] },
        { chNo: 'Ch8', value: [], lable: 'Ch8', time: [], timeVal: [] },
        { chNo: 'Ch9', value: [], lable: 'Ch9', time: [], timeVal: [] },
        { chNo: 'Ch10', value: [], lable: 'Ch10', time: [], timeVal: [] },
        { chNo: 'Ch11', value: [], lable: 'Ch11', time: [], timeVal: [] },
        { chNo: 'Ch12', value: [], lable: 'Ch12', time: [], timeVal: [] },
        { chNo: 'Ch13', value: [], lable: 'Ch13', time: [], timeVal: [] },
        { chNo: 'Ch14', value: [], lable: 'Ch14', time: [], timeVal: [] },
        { chNo: 'Ch15', value: [], lable: 'Ch15', time: [], timeVal: [] },
        { chNo: 'Ch16', value: [], lable: 'Ch16', time: [], timeVal: [] },
        { chNo: 'Ch17', value: [], lable: 'Ch17', time: [], timeVal: [] },
        { chNo: 'Ch18', value: [], lable: 'Ch18', time: [], timeVal: [] },
        { chNo: 'Ch19', value: [], lable: 'Ch19', time: [], timeVal: [] },
        { chNo: 'Ch20', value: [], lable: 'Ch20', time: [], timeVal: [] }
      ]
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
          text: '温升测试',
          left: 'center'
        },

        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              excludeComponents: ['toolbox'],
              pixelRatio: 2
            }
          }
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
            data: [
              'Ch1',
              'Ch2',
              'Ch3',
              'Ch4',
              'Ch5',
              'Ch6',
              'Ch7',
              'Ch8',
              'Ch9',
              'Ch10'
            ],
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
              'Ch11',
              'Ch12',
              'Ch13',
              'Ch14',
              'Ch15',
              'Ch16',
              'Ch17',
              'Ch18',
              'Ch19',
              'Ch20'
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
            interval: 100,
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          name: '℃', // y轴名称
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
            name: 'Ch1',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch2',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch3',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch4',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch5',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch6',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch7',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch8',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch9',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch10',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch11',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch12',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch13',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch14',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch15',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch16',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch17',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch18',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch19',
            data: [],
            type: 'line'
          },
          {
            name: 'Ch20',
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
      this.nowStr = now.format('yyyy-MM-dd hh:mm:ss')
      var timeNow = this.nowStr

      this.time.push(this.nowStr)
      for (var i = 0; i < this.tableDataForExcel.length; i++) {
        this.tableDataForExcel[i].time = this.time
      }

      if (shift) {
        this.time.shift()
      }
    },

    runStop: function(run) {
      console.log(this.cycleTime)
      console.log(run) // 开关开了就是 true  关了就是false
      if (run) {
        this.timerId = setInterval(() => {
          this.refreshTime(false)
          console.log(this.time)

          var option = this.myChart.getOption()
          var seriesData = option.series

          this.$http.get('api/gettemp').then(result => {
            // console.log('onenet返回' + JSON.stringify(result.body))
            // console.log(
            //   JSON.parse(result.body['data']).data.datastreams[0].datapoints
            // )
            var tempObj = JSON.parse(result.body['data']).data.datastreams[0]
              .datapoints[0]
            seriesData[parseInt(tempObj.value.CH) - 1].data.push(
              parseFloat(tempObj.value.TEMP) / 100
            )
            console.log(this)
            this.tableData[parseInt(tempObj.value.CH) - 1].value =
              parseFloat(tempObj.value.TEMP) / 100
            this.tableDataForExcel[parseInt(tempObj.value.CH) - 1].value.push(
              parseFloat(tempObj.value.TEMP) / 100
            )

            this.myChart.setOption({
              xAxis: {
                data: this.time
              },

              series: seriesData
            })
          })
          console.log('%%%%%%%')
          console.log(seriesData)

          // for (var i = 0; i < seriesData.length; i++) {
          //   var t = Math.random() * 100
          //   seriesData[i].data.push(t)
          //   this.tableData[i].value = t
          //   this.tableDataForExcel[i].value.push(t)
          // }

          // this.myChart.setOption({
          //   xAxis: {
          //     data: this.time
          //   },

          //   series: seriesData
          // })
        }, parseInt(this.cycleTime) * 1000)
      } else {
        // 保存测试数据到本地 TODO

        clearInterval(this.timerId)
      }
    },

    indexMethod(index) {
      return index + 1
    },

    handleClick(row) {
      console.log(row)
    },

    lableChange(rowData) {
      console.log(rowData)
      console.log(rowData.chNo + '  ====>  ' + rowData.lable)
      // update option.series and option.legend.data
      var itemNo = parseInt(rowData.chNo.slice(2))
      var option = this.myChart.getOption()
      var seriesData = option.series

      var legendOne = option.legend[0]
      var legendTwo = option.legend[1]

      seriesData[itemNo - 1].name = rowData.lable
      console.log('------------')
      console.log(seriesData) //设置到option.series

      this.tableDataForExcel[itemNo - 1].lable = rowData.lable

      if (itemNo <= 10) {
        console.log(itemNo)
        console.log(legendOne)
        legendOne.data[itemNo - 1] = rowData.lable //设置到option.legend
        console.log('=======')
        console.log(legendOne)

        this.myChart.setOption({
          legend: [legendOne, legendTwo],

          series: seriesData
        })
      } else {
        console.log(itemNo)
        console.log(legendTwo)
        legendTwo.data[itemNo - 10 - 1] = rowData.lable // 设置到option.legend
        console.log('#######')
        console.log(legendTwo)

        this.myChart.setOption({
          legend: [legendOne, legendTwo],

          series: seriesData
        })
      }
    },

    echartClick() {
      console.log('echart被点击了')
    },
    containerClick() {
      console.log('containerClick被点击了')
    },
    exportExcel() {
      /* generate workbook object from table */
      //表名
      var wb = XLSX.utils.table_to_book(document.querySelector('#allDataTable'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          'temperature.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
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
        if (
          parseInt(val) &&
          parseInt(oldVal) &&
          parseInt(val) != parseInt(oldVal)
        ) {
          console.log('YY')
          this.run = false
          clearInterval(this.timerId)
        } else if (parseInt(val) && parseInt(oldVal)) {
          console.log('QQQ')
          this.run = false
          this.disable = true
          clearInterval(this.timerId)
        } else if (!parseInt(val) && parseInt(oldVal)) {
          console.log('CCC')
          this.run = false
          this.disable = true
          clearInterval(this.timerId)
        } else if (parseInt(val) && !parseInt(oldVal)) {
          this.disable = false
          console.log('huhu')
        } else if (!parseInt(val) && !parseInt(oldVal)) {
          this.disable = true
          console.log('RRR')
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
