import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
    activePage: 'Home',
    username: '',
    password: '',
    showPassword: false,
    openAuthDialog: false
  },
  mutations: {
    setActivePage(state, payload) {
      state.activePage = payload;
    },
    toggleAuthDialog(state) {
      state.openAuthDialog = !state.openAuthDialog
    },
    setUsername(state, payload){
      state.username = payload
    },
    setPassword(state, payload){
      state.password = payload
    },
    toggleShowPassword(state){
      state.showPassword = !state.showPassword
    }
  },
  actions: {
    setActivePage({commit}, payload) {
      commit('setActivePage', payload)
    },
    toggleAuthDialog({commit}){
      commit('toggleAuthDialog')
    },
    setUsername({commit}, payload){
      commit('setUsername', payload)
    },
    setPassword({commit}, payload){
      commit('setPassword', payload)
    },
    toggleShowPassword({commit}){
      commit('toggleShowPassword')
    }
  },
  getters: {
    getActivePage: state => state.activePage
  },
  modules: {}
})