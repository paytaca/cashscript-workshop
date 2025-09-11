<template>
  <q-card>
    <q-form @submit="submitForm">
      <q-card-section class="q-gutter-y-md">
        <div class="text-h6">Parameters</div>
        <q-input label="Payout Amount (satoshis)" outlined dense/>
        <q-input label="Owner Address" outlined dense/>
        <q-input label="Passcode" outlined dense/>
      </q-card-section>

      <q-card-actions>
        <q-btn label="Save Contract" type="submit" color="blue" class="full-width"/>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { useContractStore } from 'src/stores/contract-store';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PasswordVaultFormCard',
  data() {
    return {
      // state variables here
      formPayoutAmount: 0,
      formPwnerAddress: '',
      formPasscode: '',
    }
  },
  methods: {
    submitForm() {
      // Pass event name and arguments
      this.$emit('');
    }
  },
  mounted() {
    const contractStore = useContractStore();
    this.payoutAmount = contractStore.parameters.payoutAmount;
    this.ownerAddress = contractStore.parameters.ownerAddress;
    this.passcode = contractStore.parameters.passcode;
  }
})
</script>
