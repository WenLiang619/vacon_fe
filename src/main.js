import Vue from 'vue'

//1. 导入vue-router包
import VueRouter from 'vue-router'

//2. 手动安装VueRouter
Vue.use(VueRouter)

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


import app from './App.vue'

// 导入自定路由模块
import router from './router.js'

var vm = new Vue({
  el: '#app',
  render: c => c(app), //render会把el指定的容器中 所有的内容都清空覆盖，所以不要把路由的router-view和router-link直接写到el所控制的元素中
  //4. 将路由对象挂载到vm上
  router
})
