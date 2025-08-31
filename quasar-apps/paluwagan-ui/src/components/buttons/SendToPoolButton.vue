<template>
  <q-btn
    rounded
    color="blue"
    label="Send Money to Pool"
    @click="displayAddressQrDialog"
  />
</template>

<script>
import { defineComponent } from 'vue'

import AddressQrDialog from 'src/components/dialogs/AddressQrDialog.vue'

export default defineComponent({
  name: 'SendToPoolButton',

  methods: {
    displayAddressQrDialog() {
      this.$q.dialog({
        component: AddressQrDialog
      })
    }
  }
})
</script>