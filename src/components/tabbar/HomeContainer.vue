<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/lcp.jpg" alt />
          <div class="mui-media-body">Drive 新闻</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/grid_simulator">
          <img src="../../images/nxc.png" alt />
          <div class="mui-media-body">Grid Simulator</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/fc302.png" alt />
          <div class="mui-media-body">Drive美图</div>
        </router-link>
      </li>
      <!-- <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">location</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">Search</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">Phone</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-gear"></span>
          <div class="mui-media-body">Setting</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-info"></span>
          <div class="mui-media-body">about</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-more"></span>
          <div class="mui-media-body">more</div>
        </a>
      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lunbotuList: []
    }
  },
  created() {
    this.getLunbotu()
  },
  methods: {
    getLunbotu() {
      this.lunbotuList = [
        {
          img: 'https://www.danfoss.com/static/images/logo.svg',
          url: 'https://www.sohu.com'
        },
        {
          img:
            'https://danfossworkplaceprodumbraco.azureedge.net/media/37931/covid-19-news-1.jpg?anchor=center&mode=crop&width=1280&height=720&rnd=132283141920000000',
          url: 'https://www.baidu.com'
        },
        {
          img:
            'https://mlskd.cn/resources/images_swiperbbs/4c03dfcfcb2a4224e1a22bc83571bec_aeEBV4b.jpg',
          url: 'https://www.danfoss.com'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// .mint-header {
//   background-color: red;
//   font-size: 26px;
// }
.mint-swipe {
  height: 300px; // 控制轮播图高度

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: cyan;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: white;
  border: none;
  img {
    width: 70px;
    height: 70px;
  }
  .mui-media-body {
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>

