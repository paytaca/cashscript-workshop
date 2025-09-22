<template>
  <span>
    <q-btn label="Sweep" rounded color="blue" icon="cleaning_services" @click="showDialog = true"/>
    <q-dialog v-model="showDialog" persitent>
      <q-card style="min-width: min(300px, 50vw);">
        <q-form @submit="sweep">
          <q-card-section>
            <q-input v-model="wif" label="Owner WIF"/>
            <q-input v-model="recipientAddress" placeholder="bitcoincash:pz..." label="Recipient"/>
          </q-card-section>
          <q-card-actions align="evenly">
            <q-btn label="Cancel" no-caps outline color="grey" v-close-popup/>
            <q-btn label="Sweep" no-caps color="blue" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </span>
</template>
<script>
import { defineComponent } from 'vue';
import { isValidAddress } from 'src/lib/common.js';
import { sweepContractFunds } from 'src/lib/contract-owner-unlock.js';
import LoadingDialog from '../dialogs/LoadingDialog.vue';
import TransactionDialog from '../dialogs/TransactionDialog.vue';


export default defineComponent({
  name: 'SweepVaultButton',
  props: {
    payout: Number,
    ownerAddress: String,
    passcode: String,
  },
  data() {
    return {
      showDialog: false,

      wif: '',
      recipientAddress: '',
    }
  },
  methods: {
    async sweep() {
      if (!isValidAddress(this.recipientAddress)) {
        this.$q.dialog({
          title: 'Invalid recipient address',
          message: 'Must be a valid BitcoinCash address'
        })
        return
      }

      const dialog = this.$q.dialog({
        component: LoadingDialog,
        componentProps: { message: 'Sweeping funds' },
      })

      const contractParameters = {
        payout: this.payout,
        ownerAddress: this.ownerAddress,
        passcode: this.passcode,
      }
      const result = await sweepContractFunds(
        contractParameters,
        this.wif,
        this.recipientAddress,
      ).catch(error => {
        console.error(error);
        return String(error);
      }).finally(() => {
        dialog.hide()
      })

      console.log('Sweep result:', result);
      this.wif = '';
      this.recipientAddress = '';

      if (typeof result === 'string') {
        this.$q.dialog({
          title: 'Claim failed',
          message: result,
          style: 'white-space: pre-wrap;',
          ok: true,
        })
      } else {
        this.$q.dialog({
          component: TransactionDialog,
          componentProps: { txid: result.txid, transactionHex: result.hex },
        })
      }
    }
  }
})
</script>
