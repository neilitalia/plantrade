import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import navigation from './modules/navigation'
import stripe from './modules/stripe'
import registration from './modules/registration'
import listings from './modules/listings'
import cart from './modules/cart'
import sell from './modules/sell'
import profile from './modules/profile'

Vue.use(Vuex)

Vue.config.devtools = true
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    navigation,
    stripe,
    registration,
    listings,
    cart,
    sell,
    profile
  },
  strict: debug
})