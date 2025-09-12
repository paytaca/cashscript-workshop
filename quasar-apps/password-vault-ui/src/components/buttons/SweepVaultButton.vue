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
import { useContractStore } from 'src/stores/contract-store';
import { mapState } from 'pinia';
import { sweepFunds } from 'src/lib/contract';
import LoadingDialog from '../dialogs/LoadingDialog.vue';


export default defineComponent({
  name: 'SweepVaultButton',
  data() {
    return {
      showDialog: false,

      wif: '',
      recipientAddress: '',
    }
  },
  computed: {
    ...mapState(useContractStore, {
      payoutAmount: 'payoutAmount',
      ownerAddress: 'ownerAddress',
      passcode: 'passcode',
    })
  },
  methods: {
    async sweep() {
      const dialog = this.$q.dialog({
        component: LoadingDialog,
        componentProps: { message: 'Sweeping funds' },
      })

      const contractParameters = {
        payoutAmount: this.payoutAmount,
        ownerAddress: this.ownerAddress,
        passcode: this.passcode,
      }
      const result = await sweepFunds(
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
        const url = `https://explorer.bch.ninja/tx/${result.txid}`
        this.$q.dialog({
          title: 'Swept funds!',
          message: `TXID: ${result.txid}<br/><a href="${url}" target="_blank">View txid</a>`,
          style: 'word-break: break-all;',
          html: true,
        })
      }
    }
  }
})
</script>
