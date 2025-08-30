<template>
  <q-btn
    rounded
    color="blue"
    label="Scan QR"
    @click="openScannerDialog"
  />
</template>

<script>
import { defineComponent } from 'vue'

import QrScannerDialog from 'src/components/dialogs/QrScannerDialog.vue'

export default defineComponent({
  name: 'ScanButton',

  methods: {
    openScannerDialog() {
      this.$q.dialog({
        component: QrScannerDialog
      })
    }
  }
})
</script>