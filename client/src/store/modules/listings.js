import { GetAllListings, GetListingById, SearchForListings } from "../../services/ListingServices";

const state = () => ({
  listings: [],
  openListingDialog: false,
  selectedListing: false,
  selectedListingDetails: null,
  listingsStatus: null,
  searchQuery: '',
  sortMethod: ''
})

const mutations = {
  setListings(state, payload) {
    state.listings = payload;
  },
  addToListings(state, payload){
    state.listings = [...state.listings, payload];
  },
  toggleListingDialog(state){
    state.openListingDialog = !state.openListingDialog
  },
  setListingsStatus(state, payload){
    state.listingsStatus = payload
  },
  setSelectedListing(state, payload){
    state.selectedListing = payload
  },
  setSelectedListingDetails(state, payload){
    state.selectedListingDetails = payload
  },
  resetSelectedListing(state){
    state.selectedListing = false
  },
  resetSelectedListingDetails(state){
    state.selectedListingDetails = null
  },
  setSearchQuery(state, payload){
    state.searchQuery = payload
  },
  setSortMethod(state, payload){
    state.sortMethod = payload
  }
}

const actions = {
  setListings({commit}, payload) {
    commit('setListings', payload)
  },
  setSelectedListing({commit}, payload){
    commit('setSelectedListing', payload)
  },
  toggleListingDialog({commit}){
    commit('toggleListingDialog')
  },
  resetSelectedListing({commit}){
    commit('resetSelectedListing')
  },
  resetSelectedListingDetails({commit}){
    commit('resetSelectedListingDetails')
  },
  setSearchQuery({commit}, payload){
    const query = payload.target.value
    commit('setSearchQuery', query)
  },
  setSortMethod({commit}, payload){
    commit('setSortMethod', payload)
  },
  async getRecentListings({commit}){
    const res = await GetAllListings()
    if(res.status === 200){
      commit('setListings', res.data)
    } else {
      commit('setListingsStatus', 'Failed')
    }
  },
  async getListingDetails({commit, state}){
    const res = await GetListingById(state.selectedListing)
    if(res.status ===200){
      commit('setSelectedListingDetails', res.data)
    }
  },
  async getListingsFromSearch({commit}, payload){
    const res = await SearchForListings({query: payload})
    if(res.status === 200){
      commit('setListings', res.data)
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