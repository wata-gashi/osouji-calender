import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import OsoujiList from '../views/OsoujiList'
import AddOsouji from '../views/AddOsouji'
import OsoujiInfo from '../views/OsoujiInfo'
import Setting from '../views/Setting'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/list',
    component: OsoujiList,
    children: [
      {
        name: 'add',
        path: '/list/add',
        components: {
          'add-dialog': AddOsouji
        }
      },
      {
        name: 'osouji',
        path: '/list/osouji/:id',
        components: {
          'osouji-dialog': OsoujiInfo
        }
      }
    ]
  },
  {
    path: '/setting',
    component: Setting
  }
]

var router = new Router({
  mode: 'history',
  base: process.env.ROOT_BASE,
  routes,
  linkActiveClass: 'active'
})

export default router
