import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import { authService } from './index'

export default class UserService {
  getUserData () {
    return axios.get('/user')
      .then(response => {
        store.dispatch('user/setUser', response.data)
      })
      .catch(() => {
        authService.logout()

        Vue.notify({
          group: 'custom-notification',
          type: 'error',
          text: 'Ошибка авторизации пользователя.'
        })
      })
  }

  getUserPurchases (params) {
    return axios.get('/purchases', { params })
  }
}
