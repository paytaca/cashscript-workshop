<template>
  <div class="q-pa-lg index-page-container">
    <div class="contract-card">
      <h5 class="ellipsis">
        Contract address: {{ contractAddress }}
      </h5>
      <p class="text-subtitle1">
        Balance: {{ balance }} BCH
        <q-btn icon="refresh" @click="refreshBalance"/>
      </p>

      <!-- https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation -->
      <p>Payout: {{ payoutBch }} BCH</p>
      <p>Owner address: {{ ownerAddress }}</p>
      <p>Passcode: {{ passcode }}</p>

      <!-- Activity: Add event listener -->
      <!-- https://vuejs.org/guide/essentials/event-handling -->
      <button @click="createContract" class="my-btn">
        Create contract
      </button>

      <!-- Activity: Add component props -->
      <!-- See https://vuejs.org/guide/components/props.html#prop-passing-details -->
      <DisplayAddressButton />

      <SweepVaultButton :payout="payout" :ownerAddress="ownerAddress" :passcode="passcode"/>
    </div>

    <!-- This component emits a function 'submit' -->
    <!-- Capture the 'submit' event and call 'vaultTransact' function -->
    <!-- See https://vuejs.org/guide/components/events.html#component-events -->
    <ClaimVaultCard @submit="vaultTransact" />

    <!-- Example of quasar's Dialog component -->
    <!-- See https://quasar.dev/vue-components/dialog/ -->
    <q-dialog v-model="isTransacting" persistent>
      <q-card class="q-pa-md" align="center">
        <div class="text-h4 q-mb-md">Transacting with contract</div>
        <q-spinner size="3rem"/>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { createPasswordVaultContract } from 'src/lib/contract-instantiate.js';
import { claimPasswordVault } from 'src/lib/contract-claim.js';
import { getBalance, isValidAddress } from 'src/lib/common';
import DisplayAddressButton from 'src/components/buttons/DisplayAddressButton.vue';
import ClaimVaultCard from 'src/components/ClaimVaultCard.vue';
import TransactionDialog from 'src/components/dialogs/TransactionDialog.vue';
import SweepVaultButton from 'src/components/buttons/SweepVaultButton.vue';

export default defineComponent({
  name: 'HomePage',

  components: {
    DisplayAddressButton,
    ClaimVaultCard,
    SweepVaultButton,
  },

  // See https://vuejs.org/api/options-state.html#data
  data() {
    return {
      // Copy values used in 'contracts/password-vault-instantiate.js'
      payout: 1234,
      ownerAddress: 'bitcoincash:qq4sh33hxw2v23g2hwmcp369tany3x73wugtc9p69g', // bitcoincash:q + <41 characters>
      passcode: '123456',

      contractAddress: '',
      balance: 0,

      isTransacting: false,
    }
  },

  // See https://vuejs.org/api/options-state.html#computed
  computed: {
    payoutBch: function() {
      // convert this.payout that is in satoshis to BCH
      // NOTE: 100_000_000 satoshis = 1 BCH
      return Number(this.payout) / 100_000_000;
    },
  },

  // See https://vuejs.org/api/options-state.html#methods
  methods: {
    createContract() {
      // Creating a password vault contract from state variables
      // See 'src/lib/contract-instantiate.js'
      const passwordVaultContract = createPasswordVaultContract(
        this.payout,
        this.ownerAddress,
        this.passcode
      );

      // Setting the contract address as state variable
      this.contractAddress = passwordVaultContract.address;
    },

    async vaultTransact(recipientAddress, claimPasscode) {
      // Try/catch/finally the whole process
      try {
        this.isTransacting = true;
        // Preparing parameters for function below
        const contractParameters = {
          payout: this.payout,
          ownerAddress: this.ownerAddress,
          passcode: this.passcode,
        }

        // Claim from the password vault contract
        // See 'src/lib/contract-claim.js'
        const result = await claimPasswordVault(contractParameters, recipientAddress, claimPasscode);

        // Display result with Quasar's built-in dialog builder
        // See: https://quasar.dev/quasar-plugins/dialog#invoking-custom-component
        this.$q.dialog({
          component: TransactionDialog,
          componentProps: { txid: result.hex, transactionHex: result.hex },
        })
      } catch (error) {
        // Log the error
        console.error(error);

        // Display the error using Quasar's built-in dialog builder
        // See: https://quasar.dev/quasar-plugins/dialog/
        this.$q.dialog({
          title: 'Transaction failed',
          message: String(error),
          persistent: true,
        })
      } finally {
        this.isTransacting = false;
      }
    },

    async refreshBalance() {
      if (!isValidAddress(this.contractAddress)) {
        return
      }

      const dialog = this.$q.dialog({ message: 'Updating balance', progress: true })
      try {
        const satoshis = await getBalance(this.contractAddress);
        this.balance = Number(satoshis) / 100_000_000;
      } finally {
        dialog.hide();
      }
    }
  },

  // See https://vuejs.org/api/options-lifecycle.html#mounted
  mounted() {
    // Activity: Autorun create contract
    this.createContract();
  }
});
</script>

<style scoped>
.index-page-container {
  max-width: min(600px, 85vw);
  margin-left: auto;
  margin-right: auto;
}

h5, h6 {
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
  padding: 9px 12px;
  border-radius: 2rem;
}


button.my-btn:active {
  background-color: #1d7cc9 !important;
}

div.contract-card {
  margin-bottom: 40px;
}

p {
  font-size: 18px;
}
</style>
