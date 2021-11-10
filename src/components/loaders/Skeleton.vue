<template>
  <v-row align="start" no-gutters>
    <v-col v-for="i in count" :key="i" cols="12" md="4" xl="3" sm="6">
      <v-skeleton-loader
        class="ma-3"
        type="card"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Skeleton',
  computed: {
    count () {
      return this.$vuetify.breakpoint.lgAndDown ? 3 : 4
    }
  }
}
</script>
