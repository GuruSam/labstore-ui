<template>
  <v-app-bar
    app
    color="#00acc1"
    dark
    src="/images/header_background.jpg"
    scroll-target="#page"
    scroll-threshold="500"
    fixed
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(0,172,193,.5), rgba(0,131,143,.5)"
      />
    </template>

    <a href="http://playlabirint.ru/">
      <v-img
        class="logo"
        src="/images/logo.png"
        max-height="50"
        max-width="50"
        contain
      />
    </a>

    <router-link class="white--text headline font-weight-light" to="/">ЛабStore</router-link>
    <v-divider dark class="mx-4" inset vertical v-if="!$vuetify.breakpoint.smAndDown"></v-divider>
    <Navbar/>
    <v-spacer/>

    <v-toolbar-title class="white--text font-weight-light" v-if="loggedIn && username && !$vuetify.breakpoint.xsOnly">Баланс: {{ balance }} ሌ </v-toolbar-title>
    <v-divider dark class="mx-4" inset vertical v-if="loggedIn && !$vuetify.breakpoint.xsOnly"></v-divider>

    <v-btn text color="white" v-if="loggedIn" @click="showSidebar()" :loading="!username">
      <v-avatar class="user-avatar" size="28" width="28" height="28">
        <img v-bind:src="avatar" :alt="username">
      </v-avatar>
      {{ username }}
    </v-btn>

    <v-btn text color="white" v-if="!loggedIn" href="https://login.playlabirint.ru/?r=store">Войти</v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navbar from './Navbar'

export default {
  name: 'Header',
  components: {
    Navbar
  },
  computed: mapState({
    loggedIn: state => state.auth.loggedIn,
    accessToken: state => state.auth.token.accessToken,
    username: state => state.user.username,
    avatar: state => state.user.avatar,
    balance: state => state.user.balance,
    sidebar: state => state.user.sidebar
  }),
  methods: {
    ...mapActions('auth', [
      'showLoginForm',
      'logout'
    ]),
    ...mapActions('user', [
      'showSidebar'
    ])
  }
}
</script>

<style scoped>

.user-avatar, .logo {
  margin-right: 8px;
}
.theme--dark.v-divider {
    border-color: rgba(255, 255, 255, 0.2);
}

</style>
