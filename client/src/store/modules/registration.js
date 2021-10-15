import {RegisterUser} from '../../services/AuthServices'

const iState = () => {
  return {
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    latitude: 0,
    longitude: 0,
    showPassword: false,
    registerStatus: null
  }
}

const state = () => iState()

const mutations = {
  setUsername(state, payload){
    state.username = payload
  },
  setEmail(state, payload){
    state.email = payload
  },
  setMobile(state, payload){
    state.mobile = payload
  },
  setPassword(state, payload){
    state.password = payload
  },
  setConfirmPassword(state, payload){
    state.confirmPassword = payload
  },
  setLatitude(state, payload){
    state.latitude = payload
  },
  setLongitude(state, payload){
    state.longitude = payload
  },
  setRegisterStatus(state, payload){
    state.registerStatus = payload
  },
  toggleShowPassword(state){
    state.showPassword = !state.showPassword
  },
  resetRegistration(state){
    Object.assign(state, iState())
  }
}

const actions = {
  setUsername({commit}, payload){
    const username = payload.target.value
    commit('setUsername', username)
  },
  setEmail({commit}, payload){
    const email = payload.target.value
    commit('setEmail', email)
  },
  setMobile({commit}, payload){
    const mobile = payload.target.value
    commit('setMobile', mobile)
  },
  setPassword({commit}, payload){
    const password = payload.target.value
    commit('setPassword', password)
  },
  setConfirmPassword({commit}, payload){
    const confirmPassword = payload.target.value
    commit('setConfirmPassword', confirmPassword)
  },
  setLatitude({commit}, payload){
    commit('setLatitude', payload)
  },
  setLongitude({commit}, payload){
    commit('setLongitude', payload)
  },
  toggleShowPassword({commit}){
    commit('toggleShowPassword')
  },
  setRegisterStatus({commit}, payload){
    commit('setRegisterStatus', payload)
  },
  resetRegistration({commit}){
    commit('resetRegistration')
  },
  async handleRegister({state, commit}){
    const payload = {
      username: state.username,
      email: state.email,
      password: state.password,
      mobile: state.mobile,
      latitude: state.latitude,
      longitude: state.longitude
    }
    const res = await RegisterUser(payload)
    if(res.status === 200){
      commit('setRegisterStatus', 'Success')
    } else {
      commit('setRegisterStatus', 'Failed')
    }
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}