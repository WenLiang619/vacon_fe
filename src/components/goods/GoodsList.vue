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
          title: 'VACON® 20',
          add_time: '2016-11-22T03:28:42.000Z',
          zhaiyao: '尽管外形十分紧凑',
          click: 10,
          img_url:
            'https://www.danfoss.com/media/1113/vacon-20.jpg?anchor=center&mode=scale&width=515',
          sell_price: 156,
          market_price: 127,
          stock_quantity: 64
        },
        {
          id: 2,
          title: 'VACON® NXP Air Cooled',
          add_time: '2016-05-01T03:42:42.000Z',
          zhaiyao:
            'VACON® NXP Air Cooled 变频器具有精确、强大的性能，可满足应用对变频器稳定耐用性和动态性的要求。功率范围齐全，最高可达 2 MW，提供壁挂式安装、轻体柜机和 IP00 模块。',
          click: 20,
          img_url:
            'https://www.danfoss.com/media/1119/vacon-nxp-air-cooled.jpg?anchor=center&mode=scale&width=515',
          sell_price: 605,
          market_price: 585,
          stock_quantity: 60
        },
        {
          id: 3,
          title: 'VACON® NXC',
          add_time: '2018-02-25T03:41:02.000Z',
          zhaiyao:
            'VACON® NXC 变频柜结构紧凑，可在采矿业、油气行业、供水和废水处理行业等恶劣工况下可靠运行。',
          click: 45,
          img_url:
            'https://www.danfoss.com/media/1118/vacon-nxc.jpg?anchor=center&mode=scale&width=515',
          sell_price: 265,
          market_price: 245,
          stock_quantity: 27
        },
        {
          id: 4,
          title: 'VACON® 3000',
          add_time: '2005-03-05T08:08:18.000Z',
          zhaiyao: '个性化定制，以满足最严苛的 MV 要求',
          click: 23,
          img_url:
            'https://www.danfoss.com/media/1127/vacon-3000.jpg?anchor=center&mode=scale&width=515',
          sell_price: 2589,
          market_price: 2455,
          stock_quantity: 44
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
