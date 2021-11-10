function setStateError (code, message) {
  state.error.code = code || null
  state.error.message = message || null
}

const state = {
  error: {
    code: null,
    message: null
  },
  loggedIn: false
}

const mutations = {
  clearAuthErrors: state => {
    setStateError(null)
  },
  onLogoutSuccess: state => {
    setStateError(null)
    state.loggedIn = false
  },
  loggedIn: state => {
    state.loggedIn = true
  }
}

const actions = {
  clearAuthErrors: context => {
    context.commit('clearAuthErrors')
  },
  clearLogoutInfo: async (context) => {
    context.commit('onLogoutSuccess')
  },
  loggedIn: ctx => {
    ctx.commit('loggedIn')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
