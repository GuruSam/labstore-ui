<template>
  <notifications
    group="custom-notification"
    :duration="snackbar.timeout"
  >
    <template slot="body" slot-scope="props">
      <v-snackbar
        v-model="props.item"
        :color="props.item.type"
        :timeout="-1"
        bottom
        right
      >
      {{ props.item.text }}
        <v-btn
          dark
          text
          @click="props.close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </template>
  </notifications>
</template>

<script>
export default {
  name: 'Notification',
  data: () => ({
    snackbar: {
      timeout: 10000
    }
  })
}
</script>
