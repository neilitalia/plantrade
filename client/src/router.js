import VueRouter from 'vue-router'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Sell from './pages/Sell'
import store from './store'

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else if (to.hash) {
    return {
      selector: to.hash,
      behavior: 'smooth',
    }
  } else {
    return { x: 0, y: 0 }
  }
}

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/listings', component: Listings, name: 'Listings'},
  { path: '/profile', component: Profile, name: 'Profile', meta: { auth: true }},
  { path: '/sell', component: Sell, name: 'Sell', meta: { auth: true }},
  { path: '/cart', component: Cart, name: 'Cart', meta: { auth: true }}
]

const router = new VueRouter({ routes, mode: 'history', scrollBehavior })

router.beforeEach((to, from, next)=>{
  if(
    'auth' in to.meta
    && to.meta.auth
    && !store.getters['auth/authenticated']
  ) {
    next();
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
