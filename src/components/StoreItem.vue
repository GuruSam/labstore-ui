<template>
  <v-col cols="12" md="4" xl="3" sm="6">
    <v-card class="ma-3 catalog-item">
      <v-img
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
        height="200px"
        position="center"
        :src="getItemImage(item)"
        @click="showItemDetails"
      >
        <v-card-title>
          {{ item.name }}
        </v-card-title>
      </v-img>

      <v-card-subtitle>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-chip
              color="primary"
              text-color="white"
              v-on="on"
              v-if="item.price > 0"
            >
              {{ item.price }}
              <v-icon right class="labrion">ሌ</v-icon>
            </v-chip>
            <v-chip
              color="primary"
              text-color="white"
              v-on="on"
              v-else
            >
              Бесплатно
            </v-chip>
          </template>
          <span>Цена</span>
        </v-tooltip>

        <v-chip
          color="link"
          text-color="white"
          @click="setFilter(item.category.name)"
        >
          <v-icon dense>mdi-tag</v-icon>

          {{ item.category.name }}
        </v-chip>
      </v-card-subtitle>

      <v-card-text>
        {{ cutDescription(item.description) }}
      </v-card-text>

      <v-card-actions>
        <v-btn @click="showItemDetails" text small bottom>
          Подробнее
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>

</template>

<script>
import { mapState } from 'vuex'
import { contentService } from '@/services'

export default {
  name: 'StoreItem',
  props: ['item'],
  data: () => ({}),
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
      filterState: state => state.content.filterState
    })
  },
  methods: {
    cutDescription: function (text) {
      return text.length > 100 ? text.slice(0, 100) + '...' : text
    },
    setFilter: function (filter) {
      this.$store.dispatch('content/setFilter', filter)
    },
    showItemDetails: function () {
      this.$store.dispatch('content/showItem')
      this.$router.replace({ query: { item: this.item.id } })
      contentService.getItem(this.item.id)
    },
    getItemImage (item) {
      return item.image ? item.image : '/images/item_background.jpg'
    }
  }
}
</script>

<style scoped>
.v-card {
  border-bottom: solid 3px #00acc1;
  min-height: 400px;
}
.v-card__title {
  word-break: normal;
}
.v-card__text {
  height: 80px;
}
.v-chip {
  margin-right: 10px;
}
.v-chip .v-icon {
  margin-left: -5px;
  margin-right: 5px;
  font-size: 18px;
}
.v-image {
  cursor: pointer;
}
.labrion {
  margin-top: -6px;
  margin-left: 2px!important;
  font-size: 14px!important;
}
</style>
