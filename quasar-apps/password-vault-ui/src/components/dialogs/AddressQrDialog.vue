<template>
  <q-dialog
    persistent
    ref="dialogRef"
  >
    <q-card class="q-pa-md">
      <div class="row flex-center">
        <span class="col-12 text-center text-bold">
          {{ address }}
        </span>

        <qr-code
          :text="address"
          :size="300"
        />
      </div>

      <div class="flex flex-center">
        <q-btn
          v-close-popup
          rounded
          label="Close"
          color="red"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

import QrCode from 'src/components/QrCode.vue';

export default defineComponent({
  name: 'AddressQrDialog',

  props: {
    address: { type: String, required: true, default: '' }
  },

  components: {
    QrCode
  }
})
</script>