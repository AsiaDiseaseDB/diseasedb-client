import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'
import routes from './routes.js'

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
  routes: routes // （缩写）相当于 routes: routes
})

var app = new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
}).$mount('#app')
