import { GetListingsByUser } from "../../services/ListingServices"
import { GetUserById } from "../../services/UserServices"

const state = {
  userDetails: null,
  userListings: []
}

const mutations = {
  setUserDetails(state, payload){
    state.userDetails = payload
  },
  setUserListings(state, payload){
    state.userListings = payload
  }
}

const actions = {
  setUserDetails({commit}, payload){
    commit('setUserDetails', payload)
  },
  setUserListings({commit}, payload){
    commit('setUserListings', payload)
  },
  async getUserInfo({rootState, commit}){
    const res = await GetUserById(rootState.auth.user.id)
    if(res.status===200){
      commit('setUserDetails', res.data)
    }
  },
  async getListingsByUser({rootState, commit}){
    const res = await GetListingsByUser(rootState.auth.user.id)
    if(res.status === 200){
      commit('setUserListings', res.data)
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