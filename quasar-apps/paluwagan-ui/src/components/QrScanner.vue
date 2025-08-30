<template>
  yey
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'QrScanner',

  methods: {
    onScannerInit(value) {
      console.log(value)
    },
    onScannerDecode(content) {
      console.log(content)
    }
  }
})
</script>