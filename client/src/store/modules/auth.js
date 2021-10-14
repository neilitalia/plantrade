import {Login, CheckSession} from '../../services/AuthServices'

const state = () => ({
  authenticated: false,
  user: null,
  username: '',
  password: '',
  showPassword: false,
  openAuthDialog: false,
  loginStatus: null
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
  },
  setUser(state, payload){
    state.user = payload
  },
  setAuthenticated(state, payload){
    state.authenticated = payload
  },
  setLoginStatus(state, payload){
    state.authenticated = payload
  }
}

const actions = {
  setUsername({commit}, payload){
    const username = payload.target.value
    commit('setUsername', username)
  },
  setPassword({commit}, payload){
    const password = payload.target.value
    commit('setPassword', password)
  },
  toggleShowPassword({commit}){
    commit('toggleShowPassword')
  },
  toggleAuthDialog({commit}){
    commit('toggleAuthDialog')
  },
  async handleLogin({state, commit}){
    const payload = {
      username: state.username,
      password: state.password
    }
    const res = await Login(payload)
    console.log('res :>> ', res);
    if( res.status === 200 ){
      commit('setUser', res.data.user)
      commit('setAuthenticated', true)
      commit('toggleAuthDialog')
      commit('setUsername', '')
      commit('setPassword', '')
      commit('setLoginStatus', 'Success')
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('authenticated', true)
      localStorage.setItem('userId', res.data.user.id)
      localStorage.setItem('userEmail', res.data.user.email)
      localStorage.setItem('username', res.data.user.username)
    } else (
      commit('setLoginStatus', 'Failed')
    )
  },
  async checkSession({commit}){
    const res = await CheckSession()
    if(res.status ===200){
      commit('setUser', res.data)
      commit('setAuthenticated', true)
      localStorage.setItem('authenticated', true)
    }
  },
  handleLogOut({commit}){
    commit('setUser', null)
    commit('setAuthenticated', false)
    localStorage.clear()
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