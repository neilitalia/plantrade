import { CheckOut } from "../../services/CartServices";

const state = () => ({
  loading: false,
  stripe: null
})

const mutations = {
  setStripe(state,payload){
    state.stripe = payload
  },
  setLoading(state, payload){
    state.loading = payload
  }
}

const actions = {
  setStripe({commit}, payload){
    commit('setStripe', payload)
  },
  setLoasing({commit}, payload){
    commit('setLoading', payload)
  },
  async checkOut({commit},payload){
    commit('setLoading', true)
    const req = { cart_id: payload }
    const res = await CheckOut(req)
    if(res.status===200){
      commit('setStripe', res.data)
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