<template>
    <v-navigation-drawer
      v-model="showSidebar"
      app
      right
      temporary
    >
      <v-list
        nav
        class="py-0"
      >
        <v-list-item two-line>
          <v-list-item-avatar>
            <img v-bind:src="avatar">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{username}}</v-list-item-title>
            <v-list-item-subtitle v-if="$vuetify.breakpoint.xsOnly" class="text--secondary">Баланс: {{ balance }} ሌ</v-list-item-subtitle>
          </v-list-item-content>

          <v-btn icon @click="closeSidebar()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
            v-for="item in sidebarItems"
            link
            :href="item.href"
            :to="item.to"
            :key="item.title"
            :disabled="submitted"
            @click="item.handler"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { authService } from '@/services'

export default {
  name: 'Sidebar',
  data: function () {
    return {
      submitted: false,
      sidebarItems: [
        {
          title: 'Мои покупки',
          icon: 'mdi-clipboard-list-outline',
          to: '/purchases',
          handler: () => {}
        },
        {
          title: 'Профиль продюсера',
          icon: 'mdi-cards-heart',
          href: 'https://thesims.cc/labirint/producer/profile',
          handler: () => {}
        },
        {
          title: 'Выход',
          icon: 'mdi-account-arrow-right',
          handler: this.logoutHandler
        }
      ]
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      avatar: state => state.user.avatar,
      balance: state => state.user.balance
    }),
    showSidebar: {
      get () {
        return this.$store.state.user.sidebar
      },
      set (state) {
        if (state) {
          this.$store.dispatch('user/showSidebar')
        } else {
          this.$store.dispatch('user/closeSidebar')
        }
      }
    }
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ]),
    ...mapActions('user', [
      'closeSidebar'
    ]),
    logoutHandler () {
      this.submitted = true
      authService.userLogout()
        .then(() => {
          this.$store.dispatch('user/closeSidebar')
        })
        .finally(() => {
          this.submitted = false
        })
    }
  }
}
</script>
