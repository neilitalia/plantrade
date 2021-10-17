import { CheckOut } from "../../services/CartServices";

const state = () => ({
  stripe: null
})

const mutations = {
  setStripe(state,payload){
    state.stripe = payload
  }
}

const actions = {
  setStripe({commit}, payload){
    commit('setStripe', payload)
  },
  async checkOut({commit},payload){
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