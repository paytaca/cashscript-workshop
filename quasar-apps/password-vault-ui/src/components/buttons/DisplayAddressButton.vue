<template>
  <q-btn
    rounded
    color="blue"
    label="Display QR code"
    icon="qr_code"
    @click="displayQrCode"
  />
</template>

<script>
import { defineComponent } from 'vue'

import AddressQrDialog from 'src/components/dialogs/AddressQrDialog.vue'

export default defineComponent({
  name: 'DisplayAddressButton',

  props: {
    address: String,
    qrSize: { type: Number, required: false, }
  },

  methods: {
    displayQrCode() {
      this.$q.dialog({
        component: AddressQrDialog,
        componentProps: {
          address: this.address,
          size: this.qrSize,
        }
      })
    }
  }
})
</script>