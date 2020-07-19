import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import EventHub from './EventHub'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(EventHub)
Vue.directive('visible', function (el, binding, vnode) {
  el.style.visibility = binding.value ? 'visible' : 'hidden'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
