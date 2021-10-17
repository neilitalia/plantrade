import { GetUserCartItems, AddItemToUserCart, GetUserCartsList, RemoveItemFromUserCart, IncrementCartItem, DecrementCartItem } from "../../services/CartServices";

const state = () => ({
  userCarts: [],
  userCartsList: [],
  selectedCart: false,
  cartStatus: null
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
  }
}

const actions = {
  setUserCarts({commit}, payload) {
    commit('setUserCarts', payload)
  },
  setUserCartsList({commit}, payload) {
    commit('setUserCartsList', payload)
  },
  setCartStatus({commit}, payload){
    commit('setCartStatus', payload)
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
      commit('setCartStatus', 'Added')
    } else {
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
      const newCart = [...state.userCarts.cart_owner].forEach(cart => {
        if(cart.id === res.data.payload.cart_id){
          cart.cart_listing = cart.cart_listing.filter(listing => {
            return listing.id !== res.data.payload.listing_id
          })
        }
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
      commit('setCartStatus','Incremented')
    }
  },
  async decrementCartItem({commit},payload){
    const req = {
      cart_id: payload.cartId,
      listing_id: payload.listingId
    }
    const res = await DecrementCartItem(req)
    if(res.status === 200){
      commit('setCartStatus','Decremented')
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