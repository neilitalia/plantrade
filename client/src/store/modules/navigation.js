const state = () => ({
  activePage: 'Home'
})

const mutations = {
  setActivePage(state, payload) {
    state.activePage = payload;
  }
}

const actions = {
  setActivePage({commit}, payload) {
    commit('setActivePage', payload)
  }
}

const getters = {
  activePage: (state) => state.activePage
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}