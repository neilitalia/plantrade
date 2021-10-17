import { GetUserCartItems, AddItemToUserCart, GetUserCartsList, RemoveItemFromUserCart, IncrementCartItem, DecrementCartItem, CreateNewCartList, DeleteCart } from "../../services/CartServices";

const state = () => ({
  userCarts: [],
  userCartsList: [],
  selectedCart: false,
  cartStatus: null,
  openNewCartDialog: false,
  newCartName: ''
})

const mutations = {
  setUserCarts(state, payload) {
    state.userCarts = payload;
  },
  setUserCartsList(state, payload) {
    state.userCartsList = payload;
  },
  setSelectedCart(state, payload) {
    state.selectedCart = payload
  },
  setCartStatus(state, payload) {
    state.cartStatus = payload
  },
  toggleNewCartDialog(state){
    state.openNewCartDialog = !state.openNewCartDialog
  },
  setNewCartName(state, payload){
    state.newCartName = payload
  },
  resetCartStatus(state){
    state.cartStatus = null
  }
}

const actions = {
  setUserCarts({commit}, payload) {
    commit('setUserCarts', payload)
  },
  setUserCartsList({commit}, payload) {
    commit('setUserCartsList', payload)
  },
  setSelectedCart({commit}, payload) {
    commit('selectedCart', payload)
  },
  setCartStatus({commit}, payload){
    commit('setCartStatus', payload)
  },
  toggleNewCartDialog({commit}){
    commit('toggleNewCartDialog')
  },
  setNewCartName({commit}, payload){
    commit('setNewCartName', payload)
  },
  async createNewCart({rootState, commit}){
    const res = await CreateNewCartList({name: rootState.cart.newCartName, user_id: rootState.auth.user.id})
    if(res.status === 200){
      commit('setCartStatus', 'New Cart Created')
    } else {
      commit('setCartStatus', 'Failed')
    }
  },
  async getUserCartsList({rootState, commit}){
    const res = await GetUserCartsList(rootState.auth.user.id)
    if(res.status === 200){
      commit('setUserCartsList', res.data)
    }
  },
  async getUserCartItems({rootState, commit}){
    const res = await GetUserCartItems(rootState.auth.user.id)
    if(res.status === 200){
      commit('setUserCarts', res.data)
    }
  },
  async addToCart({commit}, payload){
    const req = {
        "cart_id": payload.cartId,
        "listing_id": payload.listingId
    }
    const res = await AddItemToUserCart(req)
    if(res.status === 200){
      commit('resetCartStatus')
      commit('setCartStatus', 'Added')
    } else {
      commit('resetCartStatus')
      commit('setCartStatus', 'Failed')
    }
  },
  async removeFromCart({commit, state}, payload){
    const req = {
      "cart_id": payload.cartId,
      "listing_id": payload.listingId
    }
    const res = await RemoveItemFromUserCart(req)
    if (res.status === 200){
      commit("setCartStatus", "Removed")
      const newCart = [...state.userCarts.cart_owner].map(cart => {
        if(cart.id === res.data.payload.cart_id){
          return {...cart, cart_listing: cart.cart_listing.filter(listing => {
            return listing.id !== res.data.payload.listing_id
          })}
        }
        return cart
      })
      commit('setUserCarts', {...state.userCarts, cart_owner: newCart})
    } else {
      commit('setCartStatus','Failed')
    }
  },
  async incrementCartItem({commit},payload){
    const req = {
      cart_id: payload.cartId,
      listing_id: payload.listingId
    }
    const res = await IncrementCartItem(req)
    if(res.status === 200){
      commit('resetCartStatus')
      commit('setCartStatus','Incremented')
    } else {
      commit('resetCartStatus')
      commit('setCartStatus','Failed')
    }
  },
  async decrementCartItem({commit},payload){
    const req = {
      cart_id: payload.cartId,
      listing_id: payload.listingId
    }
    const res = await DecrementCartItem(req)
    if(res.status === 200){
      commit('resetCartStatus')
      commit('setCartStatus','Decremented')
    } else {
      commit('resetCartStatus')
      commit('setCartStatus','Failed')
    }
  },
  async deleteCart({commit}, payload){
    const res = await DeleteCart(payload)
    if(res.status === 200){
      commit('resetCartStatus')
      commit('setCartStatus','Cart Deleted')
    } else {
      commit('resetCartStatus')
      commit('setCartStatus','Failed')
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