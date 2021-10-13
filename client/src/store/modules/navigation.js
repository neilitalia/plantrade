export default {
  namespaced: true,
  state: {
    activePage: 'Home',
    openAuthDialog: false
  },
  mutations: {
    setActivePage(state, payload) {
      state.activePage = payload;
    },
    toggleAuthDialog(state) {
      state.openAuthDialog = !state.openAuthDialog
    }
  },
  actions: {
    setActivePage({commit}, payload) {
      commit('setActivePage', payload)
    },
    toggleAuthDialog({commit}){
      commit('toggleAuthDialog')
    }
  },
  getters: {},
  modules: {}
}