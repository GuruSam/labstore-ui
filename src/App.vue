<template>
  <v-app>
    <v-card>
      <Sidebar v-if="loggedIn"/>
      <Header />
      <v-main id="page">
        <v-container class="mb-5" fluid>
          <div class="background-fade d-none d-lg-block">
            <div class="background-fade-image"></div>
          </div>
          <router-view></router-view>
            <Notification />
        </v-container>
      </v-main>
      <Footer />
    </v-card>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Notification from './components/Notification'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Notification,
    Footer
  },
  computed: mapState({
    loggedIn: state => state.auth.loggedIn
  })
}
</script>
