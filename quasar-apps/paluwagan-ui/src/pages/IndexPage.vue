<template>
  <div class="flex justify-center q-pa-lg">
    <!-- insert here -->
    <refresh-balance-button />
    <send-to-pool-button />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import RefreshBalanceButton from 'src/components/buttons/RefreshBalanceButton.vue'
import SendToPoolButton from 'src/components/buttons/SendToPoolButton.vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    RefreshBalanceButton,
    SendToPoolButton
  }
});
</script>
