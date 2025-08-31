<template>
  <q-dialog
    persistent
    ref="dialogRef"
  >
    <q-card class="q-pa-md">
      <div class="row flex-center">
        <span class="col-12 text-center text-bold">
          bitcoincash:zryskvwcxe3gx7j5knkxaza0hgncm0whlcmgjxdww3
        </span>

        <qr-code
          :text="'bitcoincash:zryskvwcxe3gx7j5knkxaza0hgncm0whlcmgjxdww3'"
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

  components: {
    QrCode
  }
})
</script>