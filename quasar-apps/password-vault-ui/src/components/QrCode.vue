<template>
  <img
    alt="qr-code"
    :src="qrCodeText"
    :width="size"
  />
</template>

<script>
import { defineComponent } from 'vue'

import QRCode from 'qrcode'

export default defineComponent({
  name: 'QrCode',

  props: {
    text: { type: String, required: true, default: '' },
    size: { type: Number, required: true, default: 0 }
  },

  data() {
    return {
      qrCodeText: ''
    }
  },

  async mounted() {
    this.qrCodeText = await QRCode.toDataURL(this.text)
  }
})
</script>