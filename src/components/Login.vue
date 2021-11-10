<template>
  <v-row justify="center">
    <v-dialog v-model="showLoginForm" persistent max-width="600px" overlay-color="cyan darken-3" overlay-opacity="0.2">
      <v-card @keyup.enter="loginHandler()">
        <v-form ref="form">
          <v-img
            class="white--text align-end"
            height="150px"
            src="https://thesims.cc/labirint/theme/img/main.jpg"
            gradient="to top right, rgba(0, 58, 66, .5), rgba(0, 58, 66, .5)"
          >
            <v-card-title>Войти на сайт</v-card-title>
          </v-img>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="username" label="Логин или email" @change="clearAuthErrors()" :rules="requiredRules" required />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="password" label="Пароль" type="password" :rules="requiredRules" required />
                </v-col>
                <v-col cols="12">
                  <p class="error--text" v-if="errorMessage">
                    {{errorMessage}}
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="error" @click="closeLoginForm()">Закрыть</v-btn>
            <v-btn color="primary" @click="loginHandler()" :loading="submitted">Войти</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    requiredRules: [
      v => !!v || 'Необходимо заполнить'
    ],
    submitted: false
  }),
  computed: mapState({
    showLoginForm: state => state.auth.showLoginForm,
    errorCode: state => state.auth.error.code,
    errorMessage: state => state.auth.error.message
  }),
  methods: {
    ...mapActions('auth', [
      'login',
      'closeLoginForm',
      'clearAuthErrors'
    ]),
    loginHandler () {
      this.submitted = true
      this.login({ username: this.username, password: this.password })
        .then(() => {
          this.submitted = false
          this.$refs.form.reset()
        })
        .catch(() => {
          this.submitted = false
        })
    }
  }
}
</script>
