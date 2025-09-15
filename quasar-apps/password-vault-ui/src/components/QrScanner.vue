<!-- eslint-disable no-unused-vars -->
<template>
  <qrcode-stream
    :camera="frontCamera ? 'front': 'auto'"
    @detect="onScannerDecode"
    @camera-on="onScannerInit"
    @error="onCameraError"
    :style="{
      position: 'absolute',
      inset: 0,
    }"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

export default defineComponent({
  name: 'QrScanner',

  components: {
    QrcodeStream
  },

  data() {
    return {
      frontCamera: true
    }
  },

  methods: {
    onScannerInit() {
      console.log('camera set up successfully')
    },
    onScannerDecode(value) {
      console.log(value[0].rawValue)
    },
    onCameraError(error) {
      console.log('error', error)
      if (error.name === 'NotAllowedError') {
        // user denied camera access permission
        this.error = this.$t('CameraPermissionErrMsg1')
      } else if (error.name === 'NotFoundError') {
        // no suitable camera device installed
        this.error = this.$t('CameraPermissionErrMsg2')
      } else if (error.name === 'NotSupportedError') {
        // page is not served over HTTPS (or localhost)
        this.error = this.$t('CameraPermissionErrMsg3')
      } else if (error.name === 'NotReadableError') {
        // maybe camera is already in use
        this.error = this.$t('CameraPermissionErrMsg4')
      } else if (error.name === 'OverconstrainedError') {
        this.frontCamera = false
        // did you request the front camera although there is none?
        this.error = this.$t('CameraPermissionErrMsg5')
      } else if (error.name === 'StreamApiNotSupportedError') {
        // browser seems to be lacking features
        console.log(error)
      } else {
        this.error = this.$t('UnknownErrorOccurred') + ': ' + error.message
      }
    }
  }
})
</script>