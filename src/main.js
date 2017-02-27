import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'

import App from './App.vue'
import routes from './routes.js'
import store from './store/store.js'

Vue.use(VueRouter)
Vue.use(ElementUI)

//  配置baseURL
axios.defaults.baseURL = 'http://localhost:3000';

const router = new VueRouter({
  mode: 'history',
  routes: routes // （缩写）相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.islogin) { // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

var app = new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
}).$mount('#app')
