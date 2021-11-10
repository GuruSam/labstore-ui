<template>
  <div class="mx-lg-8">
    <v-container fluid>
      <v-row>
        <v-col cols="12" style="z-index: 1">
          <h1 class="text-uppercase font-weight-black display-1">История покупок</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" style="z-index: 1">
          <v-data-table
            :headers="headers"
            :items="items"
            :loading="items.length === 0 || fetchInProgress"
            :items-per-page="itemsPerPage"
            :server-items-length="itemsLength"
            @update:options="onPagination"
            loading-text="Загружаем список..."
            class="elevation-1"
            disable-sort
            no-data-text="Список покупок пуст."
          >
            <template v-slot:[`item.name`]="{ item }">
              <span class="cyan--text">{{ item.name }}</span>
            </template>
            <template v-slot:[`item.ticketId`]="{ item }">
              <v-btn
                v-if="item.ticketId"
                :href="`https://thesims.cc/labirint/ticket/${item.ticketId}`"
                target="_blank"
                x-small
              >
                К заявке
              </v-btn>
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <v-chip outlined small :color="getStatusColor(item.status)">{{ getStatus(item.status) }}</v-chip>
            </template>
            <template v-slot:[`item.sum`]="{ item }">
              {{ getSumLabel(item.sum) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { userService } from '@/services'

export default {
  name: 'PurchasesList',
  data: () => ({
    items: [],
    headers: [
      { value: 'name', text: 'Название' },
      { value: 'characterName', text: 'Персонаж' },
      { value: 'sum', text: 'Цена' },
      { value: 'createdAt', text: 'Дата покупки' },
      { value: 'status', text: 'Статус' },
      { value: 'ticketId', text: 'Заявка' }
    ],
    page: 1,
    itemsPerPage: 10,
    itemsLength: 0,
    fetchInProgress: false
  }),
  methods: {
    fetchData () {
      this.fetchInProgress = true
      const params = {
        limit: this.itemsPerPage,
        offset: (this.page - 1) * this.itemsPerPage
      }

      return userService.getUserPurchases(params)
        .then(({ data }) => {
          this.items = data.items
          this.itemsLength = data.total
        })
        .finally(() => {
          this.fetchInProgress = false
        })
    },

    onPagination ({ itemsPerPage, page }) {
      this.itemsPerPage = itemsPerPage
      this.page = page
      this.fetchData()
        .then(() => {
          window.scrollTo(0, 0)
        })
    },

    getStatus (status) {
      switch (status) {
        case 0:
          return 'В обработке'
        case 1:
          return 'Завершено'
        case 100:
          return 'Отменено'
        default:
          return 'Неизвестно'
      }
    },
    getStatusColor (status) {
      switch (status) {
        case 0:
          return 'orange'
        case 1:
          return 'green'
        case 100:
          return 'red'
        default:
          return '#1d1d1d'
      }
    },
    getSumLabel (sum) {
      if (sum > 0) {
        return sum + ' ሌ'
      } else {
        return 'Бесплатно'
      }
    }
  }
}
</script>
