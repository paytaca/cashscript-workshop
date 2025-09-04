<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Claim</div>
      <!-- fields go here -->
      <q-input label="Recipient Address" v-model="recipientAddress" />
      <q-input label="Passcode" v-model="passcode" />
    </q-card-section>

    <q-card-actions>
      <!-- buttons go here -->
      <q-btn label="Claim" color="blue" class="full-width" @click="claim" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapState } from 'pinia';
import { claimFaucet } from 'src/lib/contract';
import { useContractStore } from 'src/stores/contract-store';
import { defineComponent } from 'vue'
import LoadingDialog from '../dialogs/LoadingDialog.vue';


export default defineComponent({
  name: 'ClaimFaucetCard',
  data() {
    return {
      // state variables here
      recipientAddress: '',
      passcode: ''
    }
  },
  computed: {
    ...mapState(useContractStore, {
      contractParameters: 'parameters',
    })
  },
  methods: {
    async claim() {
      const dialog = this.$q.dialog({
        component: LoadingDialog,
        componentProps: {
          message: 'Claiming from faucet',
        }
      })
      const result = await claimFaucet(
        this.contractParameters,
        this.recipientAddress,
        this.passcode
      ).finally(() => {
        dialog.hide();
      })

      console.log('Claim result:', result);
      this.recipientAddress = '';
      this.passcode = '';
    }
  }
})
</script>
