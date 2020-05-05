import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import EventHub from './EventHub'

Vue.config.productionTip = false
Vue.use(EventHub)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
