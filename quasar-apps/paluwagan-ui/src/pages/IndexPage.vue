<template>
  <div class="row justify-center q-pa-lg">
    <!-- insert here -->
     <div class="row col-12 justify-center">
       <pool-balance-card />
     </div>
    <send-to-pool-button />
    <scan-button />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import SendToPoolButton from 'src/components/buttons/SendToPoolButton.vue'
import ScanButton from 'src/components/buttons/ScanButton.vue'
import PoolBalanceCard from 'src/components/cards/PoolBalanceCard.vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    SendToPoolButton,
    ScanButton,
    PoolBalanceCard
  },

  data() {
    return {
      paluwaganContract: undefined
    }
  }
});
</script>
