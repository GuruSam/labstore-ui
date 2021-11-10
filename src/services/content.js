import Vue from 'vue'
import axios from 'axios'
import store from '@/store/index'
import { userService } from './index'

export default class ContentService {
  initStore () {
    this.getCategories()
    this.getStoreItems()
  }

  getCategories () {
    axios.get('catalog/categories')
      .then(response => {
        store.dispatch('content/setCategories', response.data.categories)
      })
  }

  getStoreItems () {
    axios.get('catalog/items')
      .then(response => {
        store.dispatch('content/setStoreItems', response.data.items)
      })
  }

  getItem (id) {
    const params = {
      availability: store.state.auth.loggedIn
    }

    axios.get(`catalog/items/${id}`, { params })
      .then((response) => {
        store.dispatch('content/setItemDetails', response.data)
      })
      .catch((err) => {
        Vue.notify({
          group: 'custom-notification',
          type: 'error',
          text: err.response.data.message
        })
      })
  }

  buyItem (characterId, itemId) {
    return axios.post('purchases', { characterId, itemId })
      .then((response) => {
        userService.getUserData()

        return Promise.resolve(response)
      })
  }
}
