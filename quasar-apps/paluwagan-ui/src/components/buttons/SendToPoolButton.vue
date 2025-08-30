<template>
  <q-btn
    rounded
    color="blue"
    label="Send Money to Pool"
    @click="displayContractQrDialog"
  />
</template>

<script>
import { defineComponent } from 'vue'

import ContractQrDialog from 'src/components/dialogs/ContractQrDialog.vue'

export default defineComponent({
  name: 'SendToPoolButton',

  methods: {
    displayContractQrDialog() {
      this.$q.dialog({
        component: ContractQrDialog
      })
    }
  }
})
</script>