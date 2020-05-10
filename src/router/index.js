import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import AddOsouji from '../views/AddOsouji'
import OsoujiInfo from '../views/OsoujiInfo'

Vue.use(Router)

const routes = [{
  path: '/',
  component: Home,
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
        'osouji-dialog': OsoujiInfo
      }
    }
  ]
}]

var router = new Router({
  mode: 'history',
  base: process.env.ROOT_BASE,
  routes,
  linkActiveClass: 'active'
})

export default router
