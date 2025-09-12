<template>
  <div class="q-pa-lg index-page-container">
    <div class="contract-card">
      <h5 class="ellipsis">
        Contract address: {{ contractAddress }}
      </h5>

      <div>Payout Amount: {{ paymentAmountBch }} BCH</div>
      <div>Owner address: {{ ownerAddress }}</div>
      <div>Passcode: {{ passcode }}</div>

      <!-- Add event listener here -->
      <button class="my-btn">
        Create contract
      </button>

      <!-- Add component props here -->
      <DisplayAddressButton />

      <SweepVaultButton />
    </div>

    <PasswordVaultFormCard @createContract="onFormCardSubmit"/>
    <ClaimVaultCard />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { createContractInstance } from 'src/lib/contract.js'
import DisplayAddressButton from 'src/components/buttons/DisplayAddressButton.vue'
import PasswordVaultFormCard from 'src/components/cards/PasswordVaultFormCard.vue';
import SweepVaultButton from 'src/components/buttons/SweepVaultButton.vue';
import ClaimVaultCard from 'src/components/cards/ClaimVaultCard.vue';

import { mapState } from 'pinia'
import { useContractStore } from 'src/stores/contract-store';

export default defineComponent({
  name: 'IndexPage',
  components: {
    DisplayAddressButton,
    PasswordVaultFormCard,
    SweepVaultButton,
    ClaimVaultCard,
  },
  data() {
    return {
      // Copy values used in 'contracts/password-vault-instantiate.js'
      payoutAmount: 1234n,
      ownerAddress: 'bitcoincash:qq4sh33hxw2v23g2hwmcp369tany3x73wugtc9p69g', // bitcoincash:q + <41 characters>
      passcode: '12345',

      contractAddress: '',
    }
  },

  computed: {
    ...mapState(useContractStore, {
      // Add mappable state here,

    }),
    paymentAmountBch: function() {
      // convert this.payoutAmount that is in satoshis to BCH
      // NOTE: 100_000_000 satoshis = 1 BCH
      return Number(this.payoutAmount) / 100_000_000;
    },
  },

  methods: {
    onFormCardSubmit(payoutAmount, ownerAddress, passcode) {
      this.payoutAmount = payoutAmount;
      this.ownerAddress = ownerAddress;
      this.passcode = passcode;
      this.createContract();
    },
    createContract(){
      const passwordVaultContract = createContractInstance(this.payoutAmount, this.ownerAddress, this.passcode)
      this.contractAddress = passwordVaultContract.address;
    },
  },

  mounted() {
    // Auto create contract here
    
  }
});
</script>
<style scoped>
.index-page-container {
  max-width: min(600px, 85vw);
  margin-left: auto;
  margin-right: auto;
}

h5 {
  margin-top: 4px;
  margin-bottom: 4px;
}

button {
  margin-right: 8px;
  margin-bottom: 4px;
}

button.my-btn {
  background: #2196f3 !important;
  color: white;
  border: 0;
  padding: 8px 12px;
  border-radius: 8px;
}

button.my-btn:active {
  background-color: #1d7cc9 !important;
}

div.contract-card {
  margin-bottom: 40px;
}
</style>
