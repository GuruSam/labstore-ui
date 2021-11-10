<template>
  <v-data-table
    :headers="headers"
    :items="characters"
    dark
    disable-filtering
    disable-pagination
    disable-sort
    hide-default-footer
    mobile-breakpoint="0"
  >
    <template v-slot:[`item.character.avatar`]="{ item }">
      <v-avatar
        class="ma-2"
        size="55"
      >
        <img :src="item.character.avatar" />
      </v-avatar>
    </template>
    <template v-slot:[`item.character.name`]="{ item }">
      <div class="subtitle-2">{{ item.character.name }}</div>
    </template>
    <template v-slot:[`item.availableCount`]="{ item }">
      <v-icon v-if="item.availableCount === -1" dense small>mdi-infinity</v-icon>
      <v-chip v-else-if="item.availableCount" color="#1d1d1d" text-color="primary">{{ item.availableCount }}</v-chip>
    </template>
    <template v-slot:[`item.available`]="{ item }">
      <v-btn v-if="ableToBuy(item)" @click="buyHandler(item.character)" text>Купить</v-btn>

      <v-tooltip v-else top>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-btn disabled text>Купить</v-btn>
          </div>
        </template>
        <span>{{ getTooltipText(item) }}</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Characters',
  props: ['characters'],
  data: function () {
    return {
      headers: [
        { value: 'character.avatar', align: 'end', width: this.getAvatarWidth() },
        { text: 'Персонаж', value: 'character.name' },
        { text: 'Доступно', value: 'availableCount', align: 'center', width: '50px' },
        { value: 'available', align: 'start', width: '150px' }
      ]
    }
  },
  computed: {
    ...mapState({
      balance: state => state.user.balance,
      storeItem: state => state.content.itemDetails
    })
  },
  methods: {
    buyHandler (character) {
      this.$emit('buyClick', character)
    },
    getAvatarWidth () {
      return this.$vuetify.breakpoint.xsOnly ? 0 : '150px'
    },
    ableToBuy (item) {
      return item.available && this.balance >= this.storeItem.price
    },
    getTooltipText (item) {
      if (!item.available && item.availableReason) {
        return item.availableReason
      }

      if (!item.available && item.availableDate) {
        return 'Станет доступно ' + item.availableDate
      }

      if (this.balance < this.storeItem.price) {
        return 'Недостаточно лабриков'
      }
    }
  }
}
</script>

<style lang="scss">
tbody {
  tr:hover {
    background-color: #1b1b1b !important;
    color: inherit !important;
  }
}
</style>
