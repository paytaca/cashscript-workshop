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
import { claimVault } from 'src/lib/contract';
import { useContractStore } from 'src/stores/contract-store';
import { defineComponent } from 'vue'
import LoadingDialog from '../dialogs/LoadingDialog.vue';


export default defineComponent({
  name: 'ClaimVaultCard',
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
          message: 'Claiming from vault',
        }
      })
      const result = await claimVault(
        this.contractParameters,
        this.recipientAddress,
        this.passcode
      ).catch(error => {
        console.error(error);
        return String(error);
      }).finally(() => {
        dialog.hide();
      })

      console.log('Claim result:', result);
      this.recipientAddress = '';
      this.passcode = '';

      if (typeof result === 'string') {
        this.$q.dialog({
          title: 'Claim failed',
          message: result,
          style: 'white-space: pre-wrap;',
          ok: true,
        })
      } else {
        const url = `https://explorer.bch.ninja/tx/${result.txid}`
        this.$q.dialog({
          title: 'Claim success!',
          message: `TXID: ${result.txid}<br/><a href="${url}" target="_blank">View txid</a>`,
          style: 'word-break: break-all;',
          html: true,
        })
      }
    }
  }
})
</script>
