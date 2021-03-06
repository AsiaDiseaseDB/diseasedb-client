import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: require('./views/home.vue'),
    meta: { requireAuth: true },
    alias: '/'
  }, {
    path: '/manage',
    component: require('./views/manage.vue'),
    meta: { requireAuth: true }
  }, {
    path: '/detail',
    component: require('./views/detail.vue'),
    meta: { requireAuth: true },
    children: [{
      path: 'basicsource',
      meta: { requireAuth: true },
      component: require('./components/BasicSource.vue')
    }, {
      path: 'survey',
      meta: { requireAuth: true },
      component: require('./components/Survey.vue')
    }, {
      path: 'location',
      meta: { requireAuth: true },
      component: require('./components/Location.vue')
    }, {
      path: 'disease',
      meta: { requireAuth: true },
      component: require('./components/DiseaseData.vue')
    }, {
      path: 'intervention',
      meta: { requireAuth: true },
      component: require('./components/InterventionData.vue')
    }]
  },
  {
    path: '/login',
    component: require('./views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes  // （缩写）相当于 routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {    // 判断该路由是否需要登录权限
    if (store.state.islogin) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
