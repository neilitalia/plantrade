const state = () => ({
  authenticated: false,
  user: null,
  username: '',
  password: '',
  showPassword: false,
  openAuthDialog: false
})

const mutations = {
  setUsername(state, payload){
    state.username = payload
  },
  setPassword(state, payload){
    state.password = payload
  },
  toggleShowPassword(state){
    state.showPassword = !state.showPassword
  },
  toggleAuthDialog(state) {
    state.openAuthDialog = !state.openAuthDialog
  }
}

const actions = {
  setUsername({commit}, payload){
    commit('setUsername', payload)
  },
  setPassword({commit}, payload){
    commit('setPassword', payload)
  },
  toggleShowPassword({commit}){
    commit('toggleShowPassword')
  },
  toggleAuthDialog({commit}){
    commit('toggleAuthDialog')
  }
}

const getters = {
  username: (state) => state.username,
  password: (state) => state.password,
  user: (state) => state.user,
  authenticated: (state) => state.authenticated,
  showPassword: (state) => state.showPassword,
  openAuthDialog: (state) => state.openAuthDialog
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}



// export default {
//   namespaced: true,
//   state: {
//     authenticated: false,
//     user: null,
//     username: '',
//     password: '',
//     showPassword: false
//   },
//   mutations: {
//     setUsername(state, payload){
//       state.username = payload
//     },
//     setPassword(state, payload){
//       state.password = payload
//     },
//     toggleShowPassword(state){
//       state.showPassword = !state.showPassword
//     }
//   },
//   actions: {
//     setUsername({commit}, payload){
//       commit('setUsername', payload)
//     },
//     setPassword({commit}, payload){
//       commit('setPassword', payload)
//     },
//     toggleShowPassword({commit}){
//       commit('toggleShowPassword')
//     }
//   },
//   getters:{},
//   modules: {}
// }