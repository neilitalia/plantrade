import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import navigation from './modules/navigation'

Vue.use(Vuex)

Vue.config.devtools = true
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    navigation
  },
  strict: debug
})