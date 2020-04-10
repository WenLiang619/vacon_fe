<template>
  <div class="goods-list">
    <!-- <router-link
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      :to="'/home/goodsinfo/'+item.id"
      tag="div"
    >
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>-->

    <!-- 在网页中有两种跳转方式
    1. 使用 a 标签的形式
    2. 使用 window.location.href的形式-->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      goodslist: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      // 获取商品列表
      this.goodslist = [
        {
          id: 1,
          title: 'VLT® Refrigeration Drive FC 103',
          add_time: '2015-12-21T04:58:12.000Z',
          zhaiyao: 'VLT® Refrigeration Drive FC 103',
          click: 90,
          img_url:
            'https://www.danfoss.com/media/7727/vlt_lvd_refrigerationdrive_fc103.jpg?anchor=center&mode=scale&width=515',
          sell_price: 21765,
          market_price: 24595,
          stock_quantity: 60
        },
        {
          id: 2,
          title: 'VLT® Refrigeration Drive FC 103',
          add_time: '2015-12-21T04:58:12.000Z',
          zhaiyao: 'VACON® 20 X',
          click: 90,
          img_url:
            'https://www.danfoss.com/media/7727/vlt_lvd_refrigerationdrive_fc103.jpg?anchor=center&mode=scale&width=515',
          sell_price: 2165,
          market_price: 24505,
          stock_quantity: 60
        },
        {
          id: 3,
          title: 'VLT® Refrigeration Drive FC 103',
          add_time: '2015-12-21T04:58:12.000Z',
          zhaiyao: 'VLT® Refrigeration Drive FC 103',
          click: 90,
          img_url:
            'https://www.danfoss.com/media/1110/vacon-20-x.jpg?anchor=center&mode=scale&width=515',
          sell_price: 2165,
          market_price: 245,
          stock_quantity: 60
        },
        {
          id: 4,
          title: 'VLT® Refrigeration Drive FC 103',
          add_time: '2015-12-21T04:58:12.000Z',
          zhaiyao: 'VLT® Refrigeration Drive FC 103',
          click: 90,
          img_url:
            'https://www.danfoss.com/media/7727/vlt_lvd_refrigerationdrive_fc103.jpg?anchor=center&mode=scale&width=515',
          sell_price: 265,
          market_price: 2455,
          stock_quantity: 61
        }
      ]
    },
    getMore() {
      this.pageIndex++
      getGoodsList()
    },
    goDetail(id) {
      //使用JS的形式进行路由导航
      // this.$route 是路由参数对象 所有路由中的参数  params  query  都属于它
      // this.$router 是路由导航对象  使用它可以方便 使用js代码 实现路由前进后退 跳转到新的地址
      // this.$router.push('/home/goodsinfo/' + id)
      // this.$router.push({ path: '/home/goodsinfo/' + id })
      this.$router.push({ name: 'goodsinfo', params: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>
