// https://github.com/vuejs/vuex/blob/master/examples/shopping-cart/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from './plugins/logger'
import mutations from './mutations'
import { createState } from './state'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
Vue.config.debug = debug

export function createStore () {
  return new Vuex.Store({
    mutations,
    state: createState(),
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
}
