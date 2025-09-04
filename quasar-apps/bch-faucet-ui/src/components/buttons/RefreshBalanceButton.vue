<template>
  <q-btn
    rounded
    color="blue"
    label="Refresh Balance"
    @click="refreshContractBalance"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { getBalance } from 'src/lib/common'

import LoadingDialog from 'src/components/dialogs/LoadingDialog.vue'

export default defineComponent({
  name: 'RefreshBalanceButton',

  props: {
    contractAddress: { type: String, required: true, default: '' }
  },

  emits: [
    'on-balance-refresh'
  ],

  methods: {
    async refreshContractBalance() {
      const loadingDialog = this.$q.dialog({
        component: LoadingDialog,
        componentProps: { message: 'Refreshing pool balance...' }
      })

      const balance = await getBalance(this.contractAddress)
      this.$emit('on-balance-refresh', balance)

      loadingDialog.hide()
    }
  }
})
</script>