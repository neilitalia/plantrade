import Vue from 'vue'
import Vuesax from 'vuesax'
import VueRouter from 'vue-router'
import 'boxicons'
import 'boxicons/css/boxicons.min.css'
import 'vuesax/dist/vuesax.css'
import router from './router'
import App from './App.vue'
import store from './store';

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.use(Vuesax, {
  colors: {
    primary:'#5b3cc4',
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'rgb(36, 33, 69)'
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
