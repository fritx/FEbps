// https://github.com/vuejs/vuex/blob/master/examples/shopping-cart/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from './plugins/logger'
import state from './state'
import mutations from './mutations'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
Vue.config.debug = debug

export default new Vuex.Store({
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
