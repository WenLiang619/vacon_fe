<template>
  <div class="gridsimulator-container">
    <!-- <el-row>
    <el-col :span="24">-->
    <!-- 顶部 Header 区域 -->
    <!-- <mt-header title="Grid Simulator"> -->
    <!-- <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
    </span>-->
    <!-- </mt-header>
      </el-col>
    </el-row>-->

    <el-row>
      <el-col :span="12">
        <h3>Grid Simulator</h3>
        <!-- 操作变频器区域 -->
        <el-row :gutter="8">
          <el-col :span="7">
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
          <el-col :span="8">
            <div class="grid-content bg-purple">设定频率(%)</div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-slider v-model="ref" @change="setRef" show-input :max="max" :disabled="disabled"></el-slider>
            </div>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="12">
        <ul class="photo-list">
          <router-link
            v-for="item in list"
            :key="item.id"
            :to="'/home/photoinfo/'+ item.id"
            tag="li"
          >
            <img v-lazy="item.img_url" />
            <div class="info">
              <h1 class="info-title">{{ item.title }}</h1>
              <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
          </router-link>
        </ul>
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
      disabled: true,
      list: [] //图片列表的数组
    }
  },

  created() {
    //进入页面就主动请求图片数据
    this.getPhotoListByCateId(666)
  },

  methods: {
    connDisconn: function(connect) {
      console.log(connect)
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
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
    },

    getPhotoListByCateId(cateId) {
      //根据分类ID获取图片列表
      this.$http
        .get('api/getimages/', { params: { cate_id: cateId } })
        .then(result => {
          console.log(result.body)
          if (result.body.err_code == 0) {
            this.list.push(result.body.data)
          }
        }, console.log('获取图片出错了'))
    }
  }
}
</script>

<style lang="scss" scoped>
.gridsimulator-container {
  // padding-top: 40px;
  .el-slider--with-input {
    height: 36px;
  }
  padding: 4px 4px;
  .mint-header {
    z-index: 99;
    background-color: #324e6e;
  }

  .el-row {
    margin-bottom: 1px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #f5f6f8;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #bec3ce;
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

  .photo-list {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-bottom: 0;
    li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 40px #999;
      position: relative;
      img {
        width: 100%;
        height: 400px;
        vertical-align: middle;
      }
      img[lazy='loading'] {
        width: 40px;
        height: 300px;
        margin: auto;
      }

      .info {
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        max-height: 84px;
        .info-title {
          font-size: 14px;
        }
        .info-body {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
