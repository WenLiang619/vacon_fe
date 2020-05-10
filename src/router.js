import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

import NewsListContainer from './components/news/NewsList.vue'
import NewsInfoContainer from './components/news/NewsInfo.vue'
import PhotoListContainer from './components/photos/PhotoList.vue'
import PhotoInfoContainer from './components/photos/PhotoInfo.vue'
import GoodsListContainer from './components/goods/GoodsList.vue'
import GoodsInfoContainer from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

import GridSimulatorContainer from './components/vacon/GridSimulator.vue'
import TempeRecordingContainer from './components/iot/Temperature.vue'



//3. 创建路由对象
var router = new VueRouter({
    routes: [ // 配置路由规则
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: HomeContainer
        },
        {
            path: '/member',
            component: MemberContainer
        },
        {
            path: '/shopcar',
            component: ShopcarContainer
        },
        {
            path: '/search',
            component: SearchContainer
        },
        {
            path: '/home/newslist',
            component: NewsListContainer
        },
        {
            path: '/home/newsinfo/:id',
            component: NewsInfoContainer
        },
        {
            path: '/home/photolist',
            component: PhotoListContainer
        },
        {
            path: '/home/photoinfo/:id',
            component: PhotoInfoContainer
        },
        {
            path: '/home/goodslist',
            component: GoodsListContainer
        },
        {
            path: '/home/goodsinfo/:id',
            component: GoodsInfoContainer,
            name: 'goodsinfo'
        },
        {
            path: '/home/goodsdesc/:id',
            component: GoodsDesc,
            name: 'goodsdesc'
        },
        {
            path: '/home/goodscomment/:id',
            component: GoodsComment,
            name: 'goodscomment'
        },
        //vacon grid simulator control
        {
            path: '/home/grid_simulator',
            component: GridSimulatorContainer
        },
        //temperature recording
        {
            path: '/home/tempe_recording',
            component: TempeRecordingContainer
        }
    ],

    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

//把路由对象暴露出去
export default router
