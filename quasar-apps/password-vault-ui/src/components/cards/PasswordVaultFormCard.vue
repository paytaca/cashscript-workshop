<template>
  <q-card class="q-mb-lg">
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
      formPayoutAmount: 0,
      formOwnerAddress: '',
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
    this.formPayoutAmount = contractStore.payoutAmount;
    this.formOwnerAddress = contractStore.ownerAddress;
    this.formPasscode = contractStore.passcode;
  }
})
</script>
