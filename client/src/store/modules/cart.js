import { GetUserCartItems } from "../../services/CartServices";

const state = () => ({
  userCarts: [],
})

const mutations = {
  setUserCarts(state, payload) {
    state.userCarts = payload;
  },
}

const actions = {
  setUserCarts({commit}, payload) {
    commit('setUserCarts', payload)
  },
  async getUserCartItems({rootState, commit}){
    const res = await GetUserCartItems(rootState.auth.user.id)
    if(res.status === 200){
      commit('setUserCarts', res.data)
    }
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}