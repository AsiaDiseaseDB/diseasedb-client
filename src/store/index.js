import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state: {
    count: 0,
    islogin: true
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
