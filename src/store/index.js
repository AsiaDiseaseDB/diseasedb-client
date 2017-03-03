import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    islogin: true,
    authority: 0,  //  用户权限
    opt: ''        //  'new | edit | search |' 确定了进入detail页面时的相应初始化操作
  }
})
