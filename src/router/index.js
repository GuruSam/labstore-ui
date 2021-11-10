import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '../views/PageNotFound'
import PurchasesList from '../views/PurchasesList'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'ЛабStore'
    }
  }, {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
    meta: {
      title: 'Страница не найдена'
    }
  },
  {
    path: '/purchases',
    name: 'purchases',
    component: PurchasesList,
    meta: {
      title: 'Список покупок',
      authRequired: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  if (to.meta.authRequired && !store.state.auth.loggedIn) {
    return next('/')
  }

  next()
})

export default router
