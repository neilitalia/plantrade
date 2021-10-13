import VueRouter from 'vue-router'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Listings from './pages/Listings'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/signup', component: Auth, name: 'Auth'},
  { path: '/listings', component: Listings, name: 'Listings'},
  { path: '/orders', component: Orders, name: 'Orders'},
  { path: '/checkout', component: Checkout, name: 'Checkout'}
]

export default new VueRouter({ routes, mode: 'history' })
