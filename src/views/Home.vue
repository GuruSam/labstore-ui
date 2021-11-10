<template>
  <div class="home mx-lg-8 mx-sm-6">
    <v-container>
      <v-row>
        <v-col cols="12" style="z-index: 1">
          <h1 class="text-uppercase font-weight-black display-1">Магазин лабиринта</h1>
          <div class="subtitle-1 font-weight-regular">новые игровые возможности за лабрики</div>
        </v-col>
      </v-row>
      <v-row>
          <v-col cols="12">
            <v-btn-toggle
              color="cyan lighten-1 accent-1"
              background-color="grey darken-4"
              group
              :value="filterState"
              @change="setFilter"
            >
              <ButtonSkeleton v-if="!storeCategories" />
              <v-btn
                v-for="cat in storeCategories"
                v-bind:key="cat.id"
                v-bind:value="cat.name"
                class="filter-btn font-weight-black"
              >
                {{ cat.name }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!storeItems">
      <Skeleton />
    </v-container>
    <v-container v-if="storeItems">
      <v-row align="start" no-gutters>
          <StoreItem v-for="item in filteredItems" v-bind:key="item.id" v-bind:item="item" />
          <StoreItemDetails />
      </v-row>
      <p v-if="!filteredItems.length">В этой категории нет позиций.</p>
    </v-container>
  </div>
</template>

<script>
import StoreItem from '@/components/StoreItem'
import StoreItemDetails from '@/components/StoreItemDetails'
import Skeleton from '@/components/loaders/Skeleton'
import ButtonSkeleton from '@/components/loaders/ButtonSkeleton'
import { mapState } from 'vuex'
import { contentService } from '@/services'

export default {
  name: 'home',
  components: {
    StoreItem,
    StoreItemDetails,
    Skeleton,
    ButtonSkeleton
  },
  created () {
    contentService.initStore()
    const queryItem = this.$route.query.item

    if (queryItem) {
      this.$store.dispatch('content/showItem')
      contentService.getItem(queryItem)
    }
  },
  computed: {
    ...mapState({
      storeItems: state => state.content.storeItems,
      storeCategories: state => state.content.storeCategories,
      filterState: state => state.content.filterState
    }),
    filteredItems: function () {
      if (!this.filterState) {
        return this.storeItems
      }

      return this.storeItems.filter((item) => item.category.name === this.filterState)
    }
  },
  methods: {
    setFilter: function (filter) {
      this.$store.dispatch('content/setFilter', filter)
    }
  }
}
</script>
