import Vue from 'vue'

//1. 导入vue-router包
import VueRouter from 'vue-router'

//2. 手动安装VueRouter
Vue.use(VueRouter)


// 注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站 肯定会执行main.js 先从本地存储中 把购物车的数据读出来 放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: {
    // this.$store.state.***
    car: car // 可以简写成 car 
  },
  mutations: {
    addTocar(state, goodsinfo) {
      // this.$store.commit('方法名称'，'按需传递唯一的参数')

      // 点击 goodsinfo页面  **加入购物车**  把商品信息保存到store中的car上
      // 1.如果购物车中之前已经有这个对应的商品，那么只需要更新数量
      // 2.如果没有，只直接把商品数量push到car中

      console.log(goodsinfo)
      // 假设 在购物车中 没有找到对应的商品
      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果上面循环完 flag还是false  那就直接push进去car
      if (!flag) {
        state.car.push(goodsinfo)
      }

      // 当更新car之后 把car数组 存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      //在购物车页面 修改商品数量
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完数量后把最新的购物车数据存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    // this.$store.getters.***
    // 相当于计算属性也相当于filters
    getAllCount(state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 VueResource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://localhost:5000' //  'http://10.62.20.72:5000'
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 完整导入 Mint-UI 中的组件 
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 按需引入Element
import {
  Switch,
  Slider,
  Row,
  Col,
  Input


} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
Vue.prototype.$ELEMENT = {
  size: 'small',
  zIndex: 3000
}
// 设置语言
locale.use(lang)

// 引入组件
Vue.component(Switch.name, Switch)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.use(Slider)
Vue.component(Input.name, Input)

// 全局引入echarts
import echarts from 'echarts'

// 引入首页
import app from './App.vue'

// 导入自定路由模块
import router from './router.js'

var vm = new Vue({
  el: '#app',
  render: c => c(app), //render会把el指定的容器中 所有的内容都清空覆盖，所以不要把路由的router-view和router-link直接写到el所控制的元素中
  //4. 将路由对象挂载到vm上
  router,
  store //挂载store状态管理对象
})
