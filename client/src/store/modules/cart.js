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
      const newCart = {...res.data, cart_listing: []}
      const newCarts = { ...rootState.cart.userCarts, cart_owner: [...rootState.cart.userCarts.cart_owner, newCart]}
      commit('toggleNewCartDialog')
      commit('setCartStatus', 'New Cart Created')
      commit('setUserCarts', newCarts)
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
  async incrementCartItem({state, commit},payload){
    const req = {
      cart_id: payload.cartId,
      listing_id: payload.listingId
    }
    const res = await IncrementCartItem(req)
    if(res.status === 200){
      const newCart = [...state.userCarts.cart_owner].map(cart=>{
        if(cart.id === res.data.cart_id){
          console.log('cart :>> ', cart);
          const newCartListings = [...cart.cart_listing].map(listing => {
            if(listing.id === res.data.listing_id){
              return {...listing, cart_info: { quantity: res.data.quantity }}
            } else {
              return listing
            }
          })
          console.log('newCartListings :>> ', newCartListings);
          return {...cart, cart_listing: newCartListings}
        } else {
          return cart
        }
      })
      const updatedCarts = {...state.userCarts, cart_owner: newCart }
      commit('setUserCarts', updatedCarts)
      commit('resetCartStatus')
      commit('setCartStatus','Incremented')
    } else {
      commit('resetCartStatus')
      commit('setCartStatus','Failed')
    }
  },
  async decrementCartItem({state, commit},payload){
    const req = {
      cart_id: payload.cartId,
      listing_id: payload.listingId
    }
    const res = await DecrementCartItem(req)
    if(res.status === 200){
      const newCart = [...state.userCarts.cart_owner].map(cart=>{
        if(cart.id === res.data.cart_id){
          console.log('cart :>> ', cart);
          const newCartListings = [...cart.cart_listing].map(listing => {
            if(listing.id === res.data.listing_id){
              return {...listing, cart_info: { quantity: res.data.quantity }}
            } else {
              return listing
            }
          })
          console.log('newCartListings :>> ', newCartListings);
          return {...cart, cart_listing: newCartListings}
        } else {
          return cart
        }
      })
      const updatedCarts = {...state.userCarts, cart_owner: newCart }
      commit('setUserCarts', updatedCarts)
      commit('resetCartStatus')
      commit('setCartStatus','Decremented')
    } else {
      commit('resetCartStatus')
      commit('setCartStatus','Failed')
    }
  },
  async deleteCart({state, commit}, payload){
    const res = await DeleteCart(payload)
    if(res.status === 200){
      const newCarts = [...state.userCarts.cart_owner].filter(cart => {
        return cart.id !== parseInt(res.data.payload.cart_id)
      })
      const newUserCarts = { ...state.userCarts, cart_owner: newCarts }
      commit('setUserCarts', newUserCarts)
      commit('setCartStatus','Cart Deleted')
      commit('resetCartStatus')
    } else {
      commit('setCartStatus','Failed')
      commit('resetCartStatus')
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