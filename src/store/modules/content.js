const state = {
  storeItems: null,
  storeCategories: null,
  filterState: null,
  showItemDetails: false,
  itemDetails: null,
  showPurchaseModal: false
}

const mutations = {
  setStoreItems: (state, payload) => {
    state.storeItems = payload
  },
  setCategories: (state, payload) => {
    state.storeCategories = payload
  },
  setFilter: (state, payload) => {
    state.filterState = payload
  },
  showItem: (state) => {
    state.showItemDetails = true
  },
  closeItem: (state) => {
    state.showItemDetails = false
  },
  setItemDetails: (state, payload) => {
    state.itemDetails = payload
  },
  openPurchase: (state) => {
    state.showPurchaseModal = true
  },
  closePurchase: (state) => {
    state.showPurchaseModal = false
  }
}

const actions = {
  setStoreItems: async (ctx, payload) => {
    ctx.commit('setStoreItems', payload)
  },
  setCategories: async (ctx, payload) => {
    ctx.commit('setCategories', payload)
  },
  setFilter: async (ctx, payload) => {
    ctx.commit('setFilter', payload)
  },
  showItem: async (ctx) => {
    ctx.commit('showItem')
  },
  closeItem: async (ctx) => {
    ctx.commit('closeItem')
    ctx.commit('setItemDetails', null)
  },
  setItemDetails: async (ctx, payload) => {
    ctx.commit('setItemDetails', payload)
  },
  openPurchase: async (ctx) => {
    ctx.commit('closeItem')
    ctx.commit('openPurchase')
  },
  closePurchase: async (ctx, isReturn) => {
    ctx.commit('closePurchase')

    if (isReturn) {
      ctx.commit('showItem')
    } else {
      ctx.commit('setItemDetails', null)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
