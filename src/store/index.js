import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    treeID: 1,      //  作为树形视图的唯一标识
    islogin: true,  //  标记登录状态
    authority: 0,   //  用户权限
    opt: ''         //  'new | edit | search |' 确定了进入detail页面时的相应初始化操作
  },
  mutations: {
    updateTreeID: (state, newId) => state.treeID = newId,
    updateIslogin: (state, islogin) => state.islogin = islogin,
    updateAuthority: (state, value) => state.authority = value,
    updateOpt: (state, opt) => state.opt = opt
  }
})
