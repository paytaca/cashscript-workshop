<template>
  <q-card class="q-mb-lg">
    <q-form @submit="submitForm">
      <q-card-section class="q-gutter-y-md">
        <div class="text-h6">Claim</div>
        <!-- fields go here -->
        <q-input v-model="recipientAddress" label="Recipient Address" outlined />
        <q-input v-model="claimPasscode" label="Passcode" outlined />
      </q-card-section>

      <q-card-actions>
        <!-- buttons go here -->
        <q-btn label="Claim" color="blue" class="full-width" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { isValidAddress } from 'src/lib/common.js';


export default defineComponent({
  name: 'ClaimVaultCard',
  data() {
    return {
      // state variables here
      recipientAddress: '',
      claimPasscode: '',
    }
  },
  methods: {
    submitForm() {
      if (!isValidAddress(this.recipientAddress)) {
        this.$q.dialog({
          title: 'Invalid recipient address',
          message: 'Must be a valid BitcoinCash address'
        })
        return
      }

      this.$emit('submit', this.recipientAddress, this.claimPasscode);
    }
  }
})
</script>
