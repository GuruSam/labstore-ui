import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Notifications from 'vue-notification'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify)
Vue.use(Notifications)

export const vuetify = new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true
    },
    themes: {
      dark: {
        primary: '#00acc1',
        secondary: '#424242',
        accent: '#26c6da',
        error: '#b71c1c',
        info: '#00acc1',
        success: '#1b5e20',
        warning: '#c67000'
      }
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  }
})
