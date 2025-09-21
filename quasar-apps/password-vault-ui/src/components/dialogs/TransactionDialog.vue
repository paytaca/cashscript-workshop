<template>
  <q-dialog persistent ref="dialogRef">
    <q-card class="q-pa-md">
      <q-btn v-close-popup class="float-right" icon="close" flat/>
      <div class="text-h5">{{ title }}</div>

      <div v-if="decodedTransaction">
        <p class="text-h6 break-word">
          Transaction ID:<br/> {{ txid }}
        </p>
        <q-card class="q-pa-sm q-mb-md">
          <div class="text-subtitle1 text-weight-medium">Inputs</div>
          <div v-for="(input, index) in decodedTransaction.inputs" :key="index" class="q-mb-md">
            Input #{{ index }}
            <div>TXID: {{ input.txid }}</div>
            <div>Output Index: {{ input.vout }}</div>
            <div style="word-break: break-all;">Script Sig: {{ input.scriptSig }}</div>
            <q-separator/>
          </div>
        </q-card>

        <q-card class="q-pa-sm q-mb-md">
          <div class="text-subtitle1 text-weight-medium">Outputs</div>
          <div v-for="(output, index) in decodedTransaction.outputs" :key="index" class="q-mb-md">
            Output #{{ index }}
            <div>Address: {{ output.address }}</div>
            <div>Satoshis: {{ output.satoshis }}</div>
            <div v-if="output.token" style="word-break: break-all;">
              Token: {{ output.token }}
            </div>
            <q-separator/>
          </div>
        </q-card>
      </div>
      <div v-else>
        <p class="break-word">
          Transaction ID:<br/> {{ txid }}
        </p>
      </div>

      <q-btn
        label="Open in explorer"
        :href="explorerUrl"
        target="_blank"
        color="blue"
      />
    </q-card>
  </q-dialog>
</template>

<script>
import { decodeTransaction } from 'src/lib/common';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionDialog',

  props: {
    title: { type: String, default: 'Transaction Successful' },
    network: { type: String, default: 'mainnet' },
    txid: String,
    transactionHex: String,
  },

  computed: {
    explorerUrl: function() {
      if (this.network === 'mainnet') {
        return `https://explorer.bch.ninja/tx/${this.txid}`;
      } else {
        return `https://chipnet.bch.ninja/tx/${this.txid}`;
      }
    },
    decodedTransaction: function() {
      try {
        return decodeTransaction(this.transactionHex);
      } catch(error) {
        console.error(error);
      }
      return null;
    }
  }

})
</script>

<style>
.break-word {
  word-break: break-all;
}
</style>