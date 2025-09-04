<template>
  <div>
    <q-btn label="Sweep" rounded color="blue" icon="cleaning_services" @click="showDialog = true"/>
    <q-dialog v-model="showDialog" persitent>
      <q-card style="min-width: min(300px, 50vw);">
        <q-card-section>
          <q-input v-model="wif" label="Owner WIF"/>
          <q-input v-model="recipientAddress" placeholder="bitcoincash:pz..." label="Recipient"/>
        </q-card-section>
        <q-card-actions align="evenly">
          <q-btn label="Cancel" no-caps outline color="grey" v-close-popup/>
          <q-btn label="Sweep" no-caps color="blue" @click="sweep"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useContractStore } from 'src/stores/contract-store';
import { mapState } from 'pinia';
import { sweepFunds } from 'src/lib/contract';
import LoadingDialog from '../dialogs/LoadingDialog.vue';


export default defineComponent({
  name: 'SweepFaucetButton',
  data() {
    return {
      showDialog: false,

      wif: '',
      recipientAddress: '',
    }
  },
  computed: {
    ...mapState(useContractStore, {
      contractParameters: 'parameters',
    })
  },
  methods: {
    async sweep() {
      const dialog = this.$q.dialog({
        component: LoadingDialog,
        componentProps: { message: 'Sweeping funds' },
      })

      const result = await sweepFunds(
        this.contractParameters,
        this.recipientAddress,
        this.wif,
      ).finally(() => {
        dialog.hide()
      })

      console.log('Sweep result:', result);
      this.wif = '';
      this.recipientAddress = '';
    }
  }
})
</script>
