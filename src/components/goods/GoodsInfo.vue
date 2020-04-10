<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
      </div>
    </div>

    <!-- 商品购买 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
      <div class="mui-card-footer">页脚</div>
    </div>
  </div>
</template>




<script>
//导入轮播图组件
import swiper from '../subcomponents/swiper.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: []
    }
  },
  created() {
    this.getLunbotu()
  },
  methods: {
    getLunbotu() {
      this.lunbotu = [
        {
          img:
            'https://www.danfoss.com/media/7728/vlt_lvd_aqu_adrive_fc202.jpg?anchor=center&mode=scale&width=450'
        },
        {
          img:
            'https://www.danfoss.com/media/15130/ceo-kim-fausing-ar2019-1120x747.jpg?anchor=center&mode=scale&width=520'
        }
      ]
    }
  },
  components: {
    swiper
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
}
</style>

