import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import navigation from './modules/navigation'
import stripe from './modules/stripe'
import registration from './modules/registration'
import listings from './modules/listings'

Vue.use(Vuex)

Vue.config.devtools = true
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    navigation,
    stripe,
    registration,
    listings
  },
  strict: debug
})