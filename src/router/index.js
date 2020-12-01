import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// const main = () => import('../components/content/Main.vue')
const DiscoverMusic = () => import('../views/discover/DiscoverMusic')
const Individuation=()=>import('../views/discover/childRouter/Individuation') //个性推荐
// 每日推荐歌单详情
const MusicListDetail = () => import('../views/musicListDetail/musicListDetail')
// 独家推荐视频播放
const PlayMV = () => import('../views/mv/PlayMV');
const routes = [
  {
    path:'',
    redirect:'/discover',
  },
  {
    path: '/discover',
    component:DiscoverMusic,
    redirect:'/discover/individ',
    children:[
      {
        path:'individ',
        component:Individuation
      },
    ]
  },
  // 歌单详情
  {
    path:'/musiclistdetail/:id',
    name:'detail',
    component:MusicListDetail
  },
  // 视频播放
  {
    path:'/playmv/:id',
    component:PlayMV
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
