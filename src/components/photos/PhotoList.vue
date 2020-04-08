<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id==0?'mui-active':'']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 1. 导入 mui 的js文件
import mui from '../../lib/mui/js/mui.min.js'

mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
})

export default {
  data() {
    return {
      cates: [], //所有图片分类的列表数组
      list: []
    }
  },
  mounted() {
    // 当组件中的DOM结构渲染好并放到页面中后会执行这个钩子函数
    // 如果要操作DOM元素，最好在mounted里面，因为这时候的DOM元素是最新的
    // 2. 初始化滑动组件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  created() {
    this.getAllCategory()
    // 默认进入页面 就主动请求 所有图片列表
    this.getPhotoListByCateId(0)
  },
  methods: {
    getAllCategory() {
      //获取所有的图片分类
      this.$http.get('api/getimgcategory').then(result => {
        if (result.body.err_code === 0) {
          //手动拼接出一个最完美的 分类列表
          result.body.data.unshift({
            title: '欢迎',
            id: 0
          })
          this.cates = result.body.data
        }
      })
    },

    getPhotoListByCateId(cateId) {
      //根据分类ID获取图片列表
      this.$http
        .get('api/getimages/', { params: { cate_id: cateId } })
        .then(result => {
          console.log(result.body)
          if (result.body.err_code == 0) {
            this.list = result.body.data
          }
        }, console.log('获取图片出错了'))
    }
  }
}
</script>

<style lang="scss" scoped>
// * {
//   //这个不加 好像也可以滚动滑动条而且没有报错
//   touch-actigon: pan-y;
// }

.photo-list {
  //ul
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      // height: 400px;
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
      background-color: rgba(0, 0, 0, 0.4);
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
</style>

