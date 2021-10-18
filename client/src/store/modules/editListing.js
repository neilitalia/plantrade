import { GetListingById, UpdateListing } from "../../services/ListingServices"

const iState = () => {
  return {
    title: '',
    price: '',
    plant: '',
    description: '',
    quantity: '',
    selectedListingId: '',
    selectedListingDetails: '',
    apiResponse: null,
    openEditDialog: false,
    editListingStatus: null
  }
}

const state = () => iState()

const mutations = {
  setTitle(state, payload){
    state.title = payload
  },
  setPrice(state, payload){
    state.price = payload
  },
  setPlant(state, payload){
    state.plant = payload
  },
  setDescription(state, payload){
    state.description = payload
  },
  setQuantity(state, payload){
    state.quantity = payload
  },
  setSelectedListingId(state, payload){
    state.selectedListingId = payload
  },
  setSelectedListingDetails(state, payload){
    state.selectedListingDetails = payload
  },
  toggleEditDialog(state){
    state.openEditDialog = !state.openEditDialog
  },
  setApiResponse(state, payload){
    state.apiResponse = payload
  },
  setEditListingStatus(state, payload){
    state.editListingStatus = payload
  },
  resetEditForm(state){
    Object.assign(state, iState())
  }
}

const actions = {
  setTitle({commit}, payload){
    commit('setTitle', payload)
  },
  setPrice({commit}, payload){
    commit('setPrice', payload)
  },
  setPlant({commit}, payload){
    commit('setPlant', payload)
  },
  setDescription({commit}, payload){
    commit('setDescription', payload)
  },
  setQuantity({commit}, payload){
    commit('setQuantity', payload)
  },
  toggleEditDialog({commit}){
    commit('toggleEditDialog')
  },
  setSelectedListingId({commit}, payload){
    commit('setSelectedListingId', payload)
  },
  setEditListingStatus({commit}, payload){
    commit('setEditListingStatus', payload)
  },
  setApiResponse({commit}, payload){
    commit('setApiResponse', payload)
  },
  resetEditForm({commit}){
    commit('resetEditForm')
  },
  async setCurrentDetailsToFields({commit}, payload){
    const res = await GetListingById(payload)
    if(res.status===200){
      commit('setApiResponse', res.data)
      commit('setTitle', res.data.title)
      commit('setPrice', res.data.price)
      commit('setPlant', res.data.plant)
      commit('setDescription', res.data.description)
      commit('setQuantity', res.data.quantity)
    }
  },
  async submitEditedListing({rootState, commit}){
    const req = {
      listing_id: rootState.editListing.apiResponse.id,
      listing: {
        title: rootState.editListing.title,
        price: rootState.editListing.price,
        plant: rootState.editListing.plant,
        description: rootState.editListing.description,
        quantity: rootState.editListing.quantity
      }
    }
    const res = await UpdateListing(req)
    if(res.status === 200){
      const newListings = [...rootState.profile.userListings].map(item => {
        if(item.id === res.data.id){
          return res.data
        } else {
          return item
        }
      })
      commit('profile/setUserListings', newListings, { root: true })
      commit('setEditListingStatus', 'Updated')
      commit('resetEditForm')
    } else {
      commit('setEditListingStatus', 'Failed')
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