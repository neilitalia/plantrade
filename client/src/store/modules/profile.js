import { GetListingsByUser, DeleteListing } from "../../services/ListingServices"
import { GetUserById } from "../../services/UserServices"

const state = {
  userDetails: null,
  userListings: [],
  openDeleteDialog: false,
  listingIdToDelete: null,
  profileStatus: null
}

const mutations = {
  setUserDetails(state, payload){
    state.userDetails = payload
  },
  setUserListings(state, payload){
    state.userListings = payload
  },
  toggleDeleteDialog(state){
    state.openDeleteDialog = !state.openDeleteDialog
  },
  setListingIdToDelete(state, payload){
    state.listingIdToDelete = payload
  },
  setProfileStatus(state, payload){
    state.profileStatus = payload
  }
}

const actions = {
  setUserDetails({commit}, payload){
    commit('setUserDetails', payload)
  },
  setUserListings({commit}, payload){
    commit('setUserListings', payload)
  },
  toggleDeleteDialog({commit}){
    commit('toggleDeleteDialog')
  },
  setListingIdToDelete({commit}, payload){
    commit('setListingIdToDelete', payload)
  },
  resetListingIdToDelete({commit}){
    commit('setListingIdToDelete', null)
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
  },
  async deleteListing({state, commit}){
    const res = await DeleteListing(state.listingIdToDelete)
    if(res.status === 200){
      commit('setProfileStatus','Listing Deleted')
    } else {
      commit('setProfileStatus','Listing Delete Failed')
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