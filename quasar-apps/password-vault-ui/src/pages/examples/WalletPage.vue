<template>
  <q-page padding class="index-page-container">
    <div v-if="address.length === 0">
      <MnemonicForm @submit="saveToLocalStorage"/>
    </div>
    <div v-else class="q-gutter-y-md">
      <div class="row justify-between">
        <div class="text-h5">Wallet</div>
        <q-btn label="Change wallet" color="red" @click="inputNewWallet"/>
      </div>
      <div>Address: {{ address }}</div>
      <div class="row items-center">
        BCH Balance: {{ balance }} BCH
        <q-btn icon="refresh" size="sm" flat :loading="fetchingBalance" @click="refreshBalance"/>
      </div>
      <DisplayAddressButton :address="address" text="Receive BCH"/>

      <div class="q-pa-md shadow-2">
        <div class="text-subtitle1">Send BCH</div>
        <q-form @submit="sendBch" class="q-gutter-y-md">
          <q-input v-model="sendFormData.recipientAddress" label="Recipient Address"/>
          <q-input v-model.number="sendFormData.satoshisAmount" label="Amount (satoshis)"/>
          <q-btn label="Send" color="blue" class="full-widtyh" type="submit"/>
        </q-form>
      </div>
    </div>
  </q-page>
</template>
<script>
import DisplayAddressButton from 'src/components/buttons/DisplayAddressButton.vue';
import TransactionDialog from 'src/components/dialogs/TransactionDialog.vue';
import MnemonicForm from 'src/components/MnemonicForm.vue';
import { getBalance, isValidAddress } from 'src/lib/common';
import { decryptString, encryptString } from 'src/lib/encryption.js';
import { Wallet } from 'src/lib/wallet.js';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WalletPage',

  components: {
    MnemonicForm,
    DisplayAddressButton,
  },

  data() {
    return {
      walletObject: null,
      address: '',

      balance: 0,
      fetchingBalance: false,


      sendFormData: {
        recipientAddress: '',
        satoshisAmount: 0,
      }
    }
  },
  
  methods: {
    loadWallet(mnemonic) {
      // Wallet class contains scripts for using the wallet
      const walletObject = new Wallet(mnemonic);

      const walletData = walletObject.generate()
      this.address = walletData.receiving.address;
      this.walletObject = walletObject;

      this.refreshBalance();
    },

    async loadWalletFromLocalStorage(passphrase) {
      if (!passphrase) {
        passphrase = window.localStorage.getItem('mnemonicPassphrase');
      }
      if (!passphrase) return

      const encryptedMnemonic = window.localStorage.getItem('encryptedMnemonic');
      if (!encryptedMnemonic) return

      // decrypt mnemonic
      try {
        const mnemonic = await decryptString(encryptedMnemonic, passphrase);
        this.loadWallet(mnemonic);
      } catch (error) {
        console.log('Failed to decrypt mnemonic')
        console.log(error);
        this.$q.dialog({ title: 'Failed to load wallet', message: 'Incorrect passphrase' })
      }

    },

    async saveToLocalStorage(mnemonic, passphrase, savePassphrase=false) {
      if (mnemonic) {
        // encrypt mnemonic
        const encryptedMnemonic = await encryptString(mnemonic, passphrase);
  
        // save encrypted mnemonic here
        window.localStorage.setItem('encryptedMnemonic', encryptedMnemonic);
      } else {
        const hasEncryptedMnemonic = window.localStorage.getItem('encryptedMnemonic');
        if (!hasEncryptedMnemonic) return
      }

      // if save passphrase
      if (savePassphrase) {
        window.localStorage.setItem('mnemonicPassphrase', passphrase);
      } else {
        window.localStorage.removeItem('mnemonicPassphrase')
      }
      this.loadWalletFromLocalStorage(passphrase);
    },

    inputNewWallet() {
      this.walletObject = null;
      this.address = '';
      this.balance = 0;
    },

    async refreshBalance() {
      if (!this.address) {
        return
      }

      this.fetchingBalance = true;
      try {
        const satoshiBalance = await getBalance(this.address);
        this.balance = Number(satoshiBalance) / 100_000_000;
      } catch(error) {
        console.log('Failed to fetch balance');
        console.log(error);
      } finally {
        this.fetchingBalance = false;
      }
    },

    async sendBch() {
      const dialog = this.$q.dialog({ title: 'Sending', progress: true, persistent: true, ok: false })
      try {
        const recipient = this.sendFormData.recipientAddress;
        const amount = this.sendFormData.satoshisAmount;

        // Validate recipient address
        if (!isValidAddress(recipient)) {
          throw new Error('Invalid recipient address')
        }

        // Send BCH using Wallet is encapsualted in this function
        // See 'async sendBch' in 'src/lib/wallet.js'
        const result = await this.walletObject.sendBch(recipient, amount)

        // Display result with Quasar's built-in dialog builder
        // See: https://quasar.dev/quasar-plugins/dialog#invoking-custom-component
        this.$q.dialog({
          component: TransactionDialog,
          componentProps: { txid: result.txid, transactionHex: result.hex },
        })

        this.sendFormData.recipientAddress = '';
        this.sendFormData.satoshisAmount = 0;
        this.refreshBalance();
      } catch(error) {
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
        dialog.hide();
      }
    }
  },

  mounted() {
    try {
      this.loadWalletFromLocalStorage('');
    } catch(error) {
      console.log('Failed to load wallet from local storage');
      console.log(error);
    }
  }
})
</script>

<style>
.index-page-container {
  max-width: min(600px, 85vw);
  margin-left: auto;
  margin-right: auto;
}
</style>