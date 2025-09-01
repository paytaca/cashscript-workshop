<template>
  <div class="row justify-center q-pa-lg q-gutter-md">
    <!-- insert here -->
     <div class="row col-12 justify-center">
       <pool-balance-card />
     </div>
     <div class="row col-12 justify-center">
       <members-list-card />
     </div>
    <send-to-pool-button
      :address="'bitcoincash:zryskvwcxe3gx7j5knkxaza0hgncm0whlcmgjxdww3'"
    />
    <scan-button />
    <create-paluwagan-button />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import SendToPoolButton from 'src/components/buttons/SendToPoolButton.vue'
import ScanButton from 'src/components/buttons/ScanButton.vue'
import PoolBalanceCard from 'src/components/cards/PoolBalanceCard.vue'
import MembersListCard from 'src/components/cards/MembersListCard.vue'
import CreatePaluwaganButton from 'src/components/buttons/CreatePaluwaganButton.vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    SendToPoolButton,
    ScanButton,
    PoolBalanceCard,
    MembersListCard,
    CreatePaluwaganButton
  },

  data() {
    return {
      membersList: []
    }
  }
});
</script>
