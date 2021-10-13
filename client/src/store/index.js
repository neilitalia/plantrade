import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
    activePage: 'Home'
  },
  mutations: {
    setActivePage(state, payload) {
      state.activePage = payload;
    }
  },
  actions: {
    setActivePage({commit}, payload) {
      commit('setActivePage', payload)
    }
  },
  getters: {
    getActivePage: state => state.activePage
  },
  modules: {}
})