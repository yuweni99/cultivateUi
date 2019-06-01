import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

//注册插件
Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
