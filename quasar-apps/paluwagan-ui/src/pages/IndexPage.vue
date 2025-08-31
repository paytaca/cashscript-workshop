<template>
  <div class="flex justify-center q-pa-lg">
    <!-- insert here -->
    <refresh-balance-button
      :contract-address="'bchtest:qzxu7zvdgquka95v83m6u8ywzrsdk4vah5wrmerdu0'"
    />
    <send-to-pool-button />
    <scan-button />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import RefreshBalanceButton from 'src/components/buttons/RefreshBalanceButton.vue'
import SendToPoolButton from 'src/components/buttons/SendToPoolButton.vue'
import ScanButton from 'src/components/buttons/ScanButton.vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    RefreshBalanceButton,
    SendToPoolButton,
    ScanButton
  },

  data() {
    return {
      paluwaganContract: undefined
    }
  }
});
</script>
