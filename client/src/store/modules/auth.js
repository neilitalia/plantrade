export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: null,
    username: '',
    password: '',
    showPassword: false
  },
  mutations: {
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
  getters:{},
  modules: {}
}