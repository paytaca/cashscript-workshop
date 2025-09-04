<template>
  <q-card bordered class="q-pa-md">
    <div class="row justify-between text-h6">
      Pool Balance: {{ poolBalance }} BCH
      <refresh-balance-button
        :contract-address="contractAddress"
        @on-balance-refresh="onBalanceRefresh"
      />
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

import RefreshBalanceButton from 'src/components/buttons/RefreshBalanceButton.vue'

export default defineComponent({
  name: 'PoolBalanceCard',

  components: {
    RefreshBalanceButton
  },

  props: {
    contractAddress: { 
      type: String,
      default: 'bchtest:qzxu7zvdgquka95v83m6u8ywzrsdk4vah5wrmerdu0',
    },
  },

  data() {
    return {
      poolBalance: 0.00004562
    }
  },

  methods: {
    onBalanceRefresh(value) {
      this.poolBalance = value
    }
  }
})
</script>