import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'   
  },
  {
    path: '/',
    name: '',
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/Home.vue'),
      },
      {
        path: 'addSongSheet',
        name: 'addSongSheet',
        component: () => import('../views/home/AddSongSheet.vue'),
      },
      {
        path: 'musicHall',
        name: 'musicHall',
        component: () => import('../views/musicHall/MusicHall.vue'),
      },
      {
        path: 'singerInfo',
        name: 'singerInfo',
        component: () => import('../views/musicHall/SingerInfo.vue'),
      },
      {
        path: 'songSheet',
        name: 'songSheet',
        component: () => import('../views/common/SongSheet.vue'),
      },
      {
        path: 'albumSongs',
        name: 'albumSongs',
        component: () => import('../views/common/AlbumSongs.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('../views/search/Search.vue'),
      },
      {
        path: 'searchResult',
        name: 'searchResult',
        component: () => import('../views/search/SearchResult.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 避免重复点击同一个路由出现错误
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
