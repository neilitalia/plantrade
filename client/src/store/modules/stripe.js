const state = () => ({
  publishableKey: process.env.VUE_APP_STRIPE_PUBLIC_KEY,
  successUrl: 'success',
  cancelUrl: 'cancelled',
  lineItems: [],
  loading: false
})

const getters = {
  publishableKey: state => state.publishableKey,
  successUrl: state => state.successUrl,
  cancelUrl: state => state.cancelUrl,
  lineItems: state => state.lineItems,
  loading: state => state.loading
}

const mutations = {
  addLineItems(state, payload){
    state.lineItems = [...state.lineItems, payload]
  },
  resetLineItems(state){
    state.lineItems = []
  },
  setLineItems(state, payload){
    state.lineItems = payload
  },
  toggleLoading(state){
    state.loading = !state.loading
  }
}

const actions = {
  addLineItems({commit}, payload) {
    commit('addLineItems', payload)
  },
  resetLineItems({commit}){
    commit('resetLineItems')
  },
  setLineItems({commit}, payload){
    commit('setLineItems', payload)
  },
  toggleLoading({commit}){
    commit('toggleLoading')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}