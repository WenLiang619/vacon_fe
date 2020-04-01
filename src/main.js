import Vue from 'vue'

//1. 导入vue-router包
import VueRouter from 'vue-router'

//2. 手动安装VueRouter
Vue.use(VueRouter)

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 VueResource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://localhost:5000'

// 按需引入Element
import {
  Switch,
  Slider,
  Row,
  Col
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


import app from './app.vue'

// 导入自定路由模块
import router from './router.js'

var vm = new Vue({
  el: '#app',
  render: c => c(app), //render会把el指定的容器中 所有的内容都清空覆盖，所以不要把路由的router-view和router-link直接写到el所控制的元素中
  //4. 将路由对象挂载到vm上
  router
})
