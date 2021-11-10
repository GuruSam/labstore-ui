import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { userService } from './services/index'
import { vuetify } from './plugins/index'
import './sass/fonts.scss'
import './sass/main.scss'
import './sass/custom.sass'

Vue.config.productionTip = false

if (store.state.auth.loggedIn) {
  userService.getUserData()
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
