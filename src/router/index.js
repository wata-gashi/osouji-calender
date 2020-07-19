import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import OsoujiList from '../views/OsoujiList'
import AddOsouji from '../views/AddOsouji'
import OsoujiEdit from '../views/OsoujiEdit'
import Setting from '../views/Setting'

Vue.use(Router)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'list',
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
          'oi': OsoujiEdit
        },
        props: {
          'oi': true
        }
      }
    ]
  },
  {
    name: 'setting',
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
