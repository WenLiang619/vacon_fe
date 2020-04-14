<template>
  <div class="goodsinfo-container">
    <transition name="fade111" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{ goodsinfo.goods_no }}</p>
          <p>库存情况:{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间:{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
//导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
// 导入 数字选择框 组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的 id挂载到data 方便后面使用
      lunbotu: [], //轮播图数据
      goodsinfo: {}, //商品信息
      ballFlag: false, //控制小球隐藏和显示的标识符
      selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
    }
  },
  created() {
    this.getLunbotu()
    this.getGoodsInfo()
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
            'https://www.danfoss.com/media/7727/vlt_lvd_refrigerationdrive_fc103.jpg?anchor=center&mode=scale&width=515'
        }
      ]
    },
    getGoodsInfo() {
      // 模拟所有商品
      var allGoods = [
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
          goods_no: '13B25650',
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
          goods_no: '13B25651',
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
          goods_no: '13B25652',
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
          goods_no: '13B25653',
          stock_quantity: 44
        }
      ]
      // 应该向后台要数据   vue-resource
      this.goodsinfo = allGoods[this.id - 1]
    },
    goDesc(id) {
      //点击使用编程式导航 跳转到图文介绍页面
      this.$router.push({ name: 'goodsdesc', params: { id: id } })
    },
    goComment(id) {
      //点击使用编程式导航 跳转评论页面
      this.$router.push({ name: 'goodscomment', params: { id: id } })
    },
    addToShopCar() {
      console.log(this.goodsinfo)
      //点击添加到购物车
      this.ballFlag = !this.ballFlag
      //拼接出一个要保存到store中car数组里的商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      }
      // 调用 store中的 mutations 来将商品加入购物车
      this.$store.commit('addTocar', goodsinfo)
    },
    beforeEnter(el) {
      el.style.transform = 'translate(0,0)'
    },
    enter(el, done) {
      el.offsetWidth

      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById('badge')
        .getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top

      // el.style.transform = 'translate(259px, 433px)'
      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = 'all 1s cubic-bezier(.4,-0.3,1,.68)'

      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count
      console.log('父组件拿到的数量值为： ' + this.selectedCount)
    }
  },
  components: {
    swiper,
    numbox
  }
}
</script>

<style lang="scss" >
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 491px;
    left: 152px;
  }
}
</style>

