import VueRouter from 'vue-router'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'
import store from './store'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/listings', component: Listings, name: 'Listings'},
  { path: '/profile', component: Profile, name: 'Profile', meta: { auth: true }},
  { path: '/orders', component: Orders, name: 'Orders', meta: { auth: true }},
  { path: '/checkout', component: Checkout, name: 'Checkout', meta: { auth: true }}
]

const router = new VueRouter({ routes, mode: 'history' })

router.beforeEach((to, from, next)=>{
  if(
    'auth' in to.meta
    && to.meta.auth
    && !store.getters['auth/authenticated']
  ) {
    next('/');
  } else if (
    'auth' in to.meta
    && !to.meta.auth
    && store.getters['auth/authenticated']
  ){
    next('/profile')
  } else {
    next();
  }
})

export default router
