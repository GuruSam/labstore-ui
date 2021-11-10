<template>
  <v-container>
    <v-row>
      <v-col style="z-index: 1">
        <h1 class="text-uppercase font-weight-black display-2">404</h1>
        <div class="title">Упс... Страница не найдена</div>
        <v-btn color="secondary" to="/" class="mt-4">
          <v-icon class="mr-1" dense>mdi-home</v-icon> Главная
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>
