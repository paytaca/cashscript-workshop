<template>
  <q-btn
    rounded
    color="blue"
    label="Refresh Pool Balance"
    @click="refreshContractBalance"
  />
</template>

<script>
import { defineComponent } from 'vue'

import LoadingDialog from 'src/components/dialogs/LoadingDialog.vue'

export default defineComponent({
  name: 'RefreshBalanceButton',

  methods: {
    refreshContractBalance() {
      const loadingDialog = this.$q.dialog({
        component: LoadingDialog,
        componentProps: { message: 'Refreshing pool balance...' }
      })

      // TODO logic for refreshing paluwagan contract balance
      console.log('todo logic for refreshing paluwagan contract balance')

      setTimeout(() => {
        loadingDialog.hide()
      }, 1500);
    }
  }
})
</script>