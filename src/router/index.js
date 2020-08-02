import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import OsoujiList from '../views/OsoujiList'
import AddOsouji from '../views/AddOsouji'
import OsoujiEdit from '../views/OsoujiEdit'
import Setting from '../views/Setting'
import OsoujiInfo from '../views/OsoujiInfo'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'todo'
    }
  },
  {
    name: 'todo',
    path: '/todo',
    component: Home,
    children: [
      {
        name: 'info',
        path: 'info/:id',
        components: {
          'oi': OsoujiInfo
        },
        props: {
          'oi': true
        }
      }
    ]
  },
  {
    name: 'list',
    path: '/list',
    component: OsoujiList,
    children: [
      {
        name: 'add',
        path: 'add',
        components: {
          'add-dialog': AddOsouji
        }
      },
      {
        name: 'osouji',
        path: 'osouji/:id',
        components: {
          'oe': OsoujiEdit
        },
        props: {
          'oe': true
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
