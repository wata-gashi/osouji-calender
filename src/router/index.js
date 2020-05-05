import Vue from 'vue'
import Router from 'vue-router'
import EmptyRouterView from '../views/EmptyRouterView'
import Home from '../views/Home.vue'
import AddOsouji from '../views/AddOsouji'

Vue.use(Router)

const routes = [{
  path: '/',
  component: EmptyRouterView,
  children: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      name: 'add',
      path: 'add',
      components: {
        default: Home,
        dialog: AddOsouji
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
