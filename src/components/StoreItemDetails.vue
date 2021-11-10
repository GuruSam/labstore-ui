<template>
  <v-row justify="center">
    <v-dialog
      v-model="showItemDetails"
      max-width="1000px"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <div v-if="item">
          <v-img
            class="white--text align-end"
            height="150px"
            :src="getItemImage(item)"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.2)"
          >
            <v-card-title>{{ item.name }}</v-card-title>

            <v-btn v-if="$vuetify.breakpoint.xsOnly" @click="closePopup" icon absolute top right>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-img>

          <v-card-subtitle class="px-5">
            <v-chip text-color="white" color="#007988" :class="labelMarginResponsive">Категория: {{ item.category.name }}</v-chip>
            <v-chip v-if="item.price > 0" text-color="white" color="#007988" :class="labelMarginResponsive">
              Цена: {{ item.price }}
              <v-icon right class="labrion">ሌ</v-icon>
            </v-chip>
            <v-chip v-else text-color="white" color="#007988" :class="labelMarginResponsive">Бесплатно</v-chip>
            <v-chip text-color="white" color="#007988" :class="labelMarginResponsive">Таймаут: {{ item.timout }}</v-chip>
          </v-card-subtitle>

          <v-card-text class="px-5 mt-3">
            {{ item.description }}
          </v-card-text>

          <Characters
            v-if="item.availability.length"
            @buyClick="buyHandler"
            :characters="item.availability"
          />

          <v-card-actions>
            <v-spacer/>
            <v-btn @click="closePopup">Закрыть</v-btn>
          </v-card-actions>
        </div>

        <div v-else class="item-loader d-flex justify-center align-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-card>
    </v-dialog>
    <PurchaseModal :item="confirmData" />
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import PurchaseModal from './modals/PurchaseModal.vue'
import Characters from './Characters'

export default {
  name: 'StoreItemDetails',
  components: {
    PurchaseModal,
    Characters
  },
  data: () => ({
    confirmData: { character: '' }
  }),
  computed: {
    ...mapState({
      item: state => state.content.itemDetails
    }),
    showItemDetails: {
      get () {
        return this.$store.state.content.showItemDetails
      },
      set (state) {
        if (state) {
          this.$store.dispatch('content/showItem')
        } else {
          this.closePopup()
        }
      }
    },
    labelMarginResponsive () {
      return this.$vuetify.breakpoint.xsOnly ? 'mr-3 ma-1' : 'mr-3'
    }
  },
  methods: {
    getItemImage (item) {
      return item.image ? item.image : '/images/item_background.jpg'
    },
    closePopup () {
      this.$store.dispatch('content/closeItem')
      this.$router.push({ query: {} })
    },
    buyHandler (character) {
      this.confirmData = {
        id: this.item.id,
        name: this.item.name,
        character: character
      }
      this.$store.dispatch('content/openPurchase')
    }
  }
}
</script>

<style scoped>
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}
.item-loader {
  height: 150px;
}
.character-item {
  width: 500px;
}
.labrion {
  margin-top: -6px;
  margin-left: 4px!important;
  font-size: 14px!important;
}
</style>
