const state = {
  userId: '',
  username: '',
  avatar: '',
  balance: 0,
  isProducer: false,
  sidebar: false
}

const mutations = {
  setUser: (state, payload) => {
    Object.assign(state, payload)
  },
  removeUser: state => {
    state.username = ''
    state.userId = ''
    state.avatar = ''
    state.balance = 0
    state.isProducer = false
  },
  showSidebar: state => {
    state.sidebar = true
  },
  closeSidebar: state => {
    state.sidebar = false
  }
}

const actions = {
  setUser: async (context, payload) => {
    context.commit('setUser', payload)
  },
  removeUser: async context => {
    context.commit('removeUser')
  },
  showSidebar: async context => {
    context.commit('showSidebar')
  },
  closeSidebar: async context => {
    context.commit('closeSidebar')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
