import Vue from 'vue'
import App from './App'
import { createStore } from './vuex/store'

/* eslint-disable no-new */
new Vue({
  store: createStore(),
  el: 'body',
  components: { App }
})
