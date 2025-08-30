<template>
  <q-dialog
    persistent
    ref="scannerDialogRef"
  >
    <q-card class="q-pa-md">
      <div id="close-div" class="row justify-end">
        <q-btn
          flat
          icon="close"
          color="red"
          size="lg"
          v-close-popup
        />
      </div>

      <div id="scanner-div" class="flex flex-center">
        <div id="scanner-cover">
          <div id="scanner-box">

          </div>
        </div>
        <qr-scanner />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'

import QrScanner from '../QrScanner.vue';

export default defineComponent({
  name: 'QrScannerDialog',

  components: {
    QrScanner
  }
})
</script>

<style lang="scss">
#close-div {
  position: absolute;
  right: 0;
  z-index: 10;
}
#scanner-div {
  height: 50vh;
  width: 30vw;
}
#scanner-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  inset: 0px;
  display: flex;

  #scanner-box {
    position: relative;
    display: flex;
    height: 220px;
    width: 220px;
    border-radius: 10%;
    box-shadow: 0px 0px 0px 1000px rgba(0, 0, 0, 0.8);
    vertical-align: middle;
    z-index: 2000;
    align-self: center;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>