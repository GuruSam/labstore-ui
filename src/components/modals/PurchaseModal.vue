<template>
  <v-dialog
    v-model="showPurchaseModal"
    max-width="800px"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card>
      <div v-if="purchaseSuccess" class="pt-5">
        <SuccessIcon />
        <v-card-text class="text-center">
          <h2 class="cyan--text">{{ item.name }}</h2>

          <p class="mt-1 mb-2 cyan--text">{{ getStatus(this.purchase.status) }}</p>

          <v-row>
            <v-col align-self="center">
              <p class="caption" v-if="this.purchase.ticketId">
              Покупка будет обработана вручную организатором игры.<br />За ходом выполнения вы можете следить в обратной связи.
              </p>
              <p class="caption" v-else>Возможность уже доступна вашему персонажу.<br />Если у вас возникнут сложности или вопросы, обратитесь в обратную связь.</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            v-if="this.purchase.ticketId"
            :href="`https://thesims.cc/labirint/ticket/${this.purchase.ticketId}`"
            target="_blank"
            small
          >
            К заявке
          </v-btn>
          <v-btn small>Список покупок</v-btn>
          <v-btn @click="destroyModal" small>Закрыть</v-btn>
        </v-card-actions>
      </div>

      <div v-else-if="purchaseError" class="pt-5">
        <ErrorIcon />
        <v-card-text class="text-center subtitle-2">Покупка не удалась: {{ purchaseError }}</v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="returnBack" small>Назад</v-btn>
          <v-btn @click="destroyModal" small>Закрыть</v-btn>
        </v-card-actions>
      </div>

      <div v-else>
        <v-card-title>Подтвердите покупку</v-card-title>
        <v-card-text class="subtitle-2">Вы хотите купить <span class="cyan--text">{{ item.name }}</span> для персонажа <span class="cyan--text">{{ item.character.name }}</span>?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="returnBack" small>Назад</v-btn>
          <v-btn @click="buyHandler" :disabled="submitted" :loading="submitted" color="primary" small>Купить</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import SuccessIcon from './SuccessIcon'
import ErrorIcon from './ErrorIcon'
import { contentService } from '@/services'

export default {
  name: 'PurchaseModal',
  props: ['item'],
  components: {
    SuccessIcon, ErrorIcon
  },
  data: () => ({
    submitted: false,
    purchaseError: null,
    purchaseSuccess: null,
    purchase: null
  }),
  computed: {
    showPurchaseModal: {
      get () {
        return this.$store.state.content.showPurchaseModal
      },
      set (state) {
        if (state) {
          this.openPurchase()
        } else {
          this.destroyModal()
        }
      }
    }
  },
  methods: {
    ...mapActions('content', [
      'openPurchase', 'closePurchase', 'setPurchaseState'
    ]),
    returnBack () {
      this.closePurchase(true)
      this.reset()
    },
    destroyModal () {
      this.closePurchase(false)
      this.reset()
      this.$router.push({ query: {} })
    },
    buyHandler () {
      this.submitted = true
      contentService.buyItem(this.item.character.id, this.item.id)
        .then((response) => {
          this.purchaseSuccess = true
          this.purchase = response.data
        })
        .catch((error) => {
          this.purchaseError = error.response.data.message
        })
        .finally(() => {
          this.submitted = false
        })
    },
    getStatus (status) {
      switch (status) {
        case 0:
          return 'Покупка в обработке'
        case 1:
          return 'Покупка завершена'
        case 100:
          return 'Покупка отменена'
        default:
          return 'Статус покупки неизвестен'
      }
    },
    reset () {
      setTimeout(() => {
        this.purchaseSuccess = null
        this.purchaseError = null
        this.purchase = null
      }, 1000)
    }
  }
}
</script>
