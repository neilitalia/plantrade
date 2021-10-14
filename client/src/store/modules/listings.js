import { GetAllListings } from "../../services/ListingServices";

const state = () => ({
  listings: [],
  selectedListing: null,
  listingsStatus: null
})

const mutations = {
  setListings(state, payload) {
    state.listings = payload;
  },
  addToListings(state, payload){
    state.listings = [...state.listings, payload];
  },
  setListingsStatus(state, payload){
    state.listingsStatus = payload
  },
  setSelectedListing(state, payload){
    state.selectedListing = payload
  },
  resetSelectedListing(state){
    state.selectedListing = null
  }
}

const actions = {
  setListings({commit}, payload) {
    commit('setListings', payload)
  },
  async getRecentListings({commit}){
    const res = await GetAllListings()
    if(res.status === 200){
      commit('setListings', res.data)
    } else {
      commit('setListingsStatus', 'Failed')
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