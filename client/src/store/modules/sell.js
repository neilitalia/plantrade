const iState = () => {
  return {
    title: '',
    price: 0,
    plant: '',
    description: '',
    quantity: 0
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