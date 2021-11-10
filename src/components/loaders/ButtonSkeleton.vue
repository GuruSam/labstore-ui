<template>
  <v-row>
    <v-col v-for="i in 3" :key="i">
      <v-skeleton-loader
        min-width="50"
        type="button"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ButtonSkeleton'
}
</script>
