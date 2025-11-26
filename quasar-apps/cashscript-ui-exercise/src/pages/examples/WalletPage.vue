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
<script setup>
import DisplayAddressButton from 'src/components/buttons/DisplayAddressButton.vue';
import TransactionDialog from 'src/components/dialogs/TransactionDialog.vue';
import MnemonicForm from 'src/components/MnemonicForm.vue';
import { getBalance, isValidAddress } from 'src/lib/common';
import { decryptString, encryptString } from 'src/lib/encryption.js';
import { Wallet } from 'src/lib/wallet.js';
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const walletObject = ref(null);
const address = ref('');
const balance = ref(0);
const fetchingBalance = ref(false);
const sendFormData = ref({
  recipientAddress: '',
  satoshisAmount: 0,
});

function loadWallet(mnemonic) {
  // Wallet class contains scripts for using the wallet
  const wallet = new Wallet(mnemonic);

  const walletData = wallet.generate();
  address.value = walletData.receiving.address;
  walletObject.value = wallet;

  refreshBalance();
}

async function loadWalletFromLocalStorage(passphrase) {
  if (!passphrase) {
    passphrase = window.localStorage.getItem('mnemonicPassphrase');
  }
  if (!passphrase) return;

  const encryptedMnemonic = window.localStorage.getItem('encryptedMnemonic');
  if (!encryptedMnemonic) return;

  // decrypt mnemonic
  try {
    const mnemonic = await decryptString(encryptedMnemonic, passphrase);
    loadWallet(mnemonic);
  } catch (error) {
    console.log('Failed to decrypt mnemonic');
    console.log(error);
    $q.dialog({ title: 'Failed to load wallet', message: 'Incorrect passphrase' });
  }
}

async function saveToLocalStorage(mnemonic, passphrase, savePassphrase = false) {
  if (mnemonic) {
    // encrypt mnemonic
    const encryptedMnemonic = await encryptString(mnemonic, passphrase);

    // save encrypted mnemonic here
    window.localStorage.setItem('encryptedMnemonic', encryptedMnemonic);
  } else {
    const hasEncryptedMnemonic = window.localStorage.getItem('encryptedMnemonic');
    if (!hasEncryptedMnemonic) return;
  }

  // if save passphrase
  if (savePassphrase) {
    window.localStorage.setItem('mnemonicPassphrase', passphrase);
  } else {
    window.localStorage.removeItem('mnemonicPassphrase');
  }
  loadWalletFromLocalStorage(passphrase);
}

function inputNewWallet() {
  walletObject.value = null;
  address.value = '';
  balance.value = 0;
}

async function refreshBalance() {
  if (!address.value) {
    return;
  }

  fetchingBalance.value = true;
  try {
    const satoshiBalance = await getBalance(address.value);
    balance.value = Number(satoshiBalance) / 100_000_000;
  } catch (error) {
    console.log('Failed to fetch balance');
    console.log(error);
  } finally {
    fetchingBalance.value = false;
  }
}

async function sendBch() {
  const dialog = $q.dialog({ title: 'Sending', progress: true, persistent: true, ok: false });
  try {
    const recipient = sendFormData.value.recipientAddress;
    const amount = sendFormData.value.satoshisAmount;

    // Validate recipient address
    if (!isValidAddress(recipient)) {
      throw new Error('Invalid recipient address');
    }

    // Send BCH using Wallet is encapsualted in this function
    // See 'async sendBch' in 'src/lib/wallet.js'
    const result = await walletObject.value.sendBch(recipient, amount);

    // Display result with Quasar's built-in dialog builder
    // See: https://quasar.dev/quasar-plugins/dialog#invoking-custom-component
    $q.dialog({
      component: TransactionDialog,
      componentProps: { txid: result.txid, transactionHex: result.hex },
    });

    sendFormData.value.recipientAddress = '';
    sendFormData.value.satoshisAmount = 0;
    refreshBalance();
  } catch (error) {
    // Log the error
    console.error(error);

    // Display the error using Quasar's built-in dialog builder
    // See: https://quasar.dev/quasar-plugins/dialog/
    $q.dialog({
      title: 'Transaction failed',
      message: String(error),
      persistent: true,
    });
  } finally {
    dialog.hide();
  }
}

onMounted(() => {
  try {
    loadWalletFromLocalStorage('');
  } catch (error) {
    console.log('Failed to load wallet from local storage');
    console.log(error);
  }
});
</script>

<style>
.index-page-container {
  max-width: min(600px, 85vw);
  margin-left: auto;
  margin-right: auto;
}
</style>