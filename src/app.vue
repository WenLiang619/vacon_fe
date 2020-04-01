<template>
  <div>
    <h1>Grid Simulator</h1>
    <el-row :gutter="8">
      <el-col :span="4">
        <div class="grid-content bg-purple">Connect/Disconnect</div>
      </el-col>
      <el-col :span="1.5">
        <div class="grid-content bg-purple-light">
          <el-switch
            v-model="connect"
            @change="connDisconn"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :span="4">
        <div class="grid-content bg-purple">RUN/STOP</div>
      </el-col>
      <el-col :span="1.5">
        <div class="grid-content bg-purple-light">
          <el-switch
            v-model="run"
            @change="runStop"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="disabled"
          ></el-switch>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :span="4">
        <div class="grid-content bg-purple">设定频率(%)</div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <el-slider v-model="ref" @change="setRef" show-input :max="max" :disabled="disabled"></el-slider>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      run: false,
      connect: false,
      ref: 0,
      max: 100,
      disabled: true
    }
  },
  methods: {
    connDisconn: function(connect) {
      console.log(connect)
      this.$http
        .post('api/connect', { connect: this.connect }, { emulateJSON: true })
        .then(result => {
          if (result.body.err_code == 0) {
            this.disabled = false
            Toast({
              message: '变频器连接成功',
              duration: 2000,
              position: 'middle'
            })
          } else if (result.body.err_code == -1) {
            this.disabled = true
            this.ref = 0
            this.run = false
            Toast({
              position: 'middle',
              message: '变频器断开连接',
              duration: 2000
            })
          }
        })
    },

    runStop: function(run) {
      if (run) {
        this.$http.get('api/run').then(result => {
          if (result.body.err_code === 0) {
            Toast({
              position: 'middle',
              message: '启动变频器成功',
              duration: 2000
            })
          } else {
            Toast({
              position: 'middle',
              message: '启动变频器失败',
              duration: 2000
            })
          }
        })
      } else {
        this.$http.get('api/stop').then(result => {
          if (result.body.err_code === 0) {
            Toast({
              position: 'middle',
              message: '停止变频器成功',
              duration: 2000
            })
          } else {
            Toast({
              position: 'middle',
              message: '停止变频器失败',
              duration: 2000
            })
          }
        })
      }
    },

    setRef: function(ref) {
      console.log(ref)
      this.$http
        .post('api/setRef', { ref: this.ref }, { emulateJSON: true })
        .then(result => {
          console.log(result.body)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
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
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
