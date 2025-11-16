<template>
  <div class="page-container">
    <div class="my-card">
      <div class="text-h5">Password Vault Contract</div>

      <q-input v-model="payout" label="Payout Satoshis"/>
      <q-input v-model="ownerAddress" autogrow label="Owner Address"/>
      <q-input v-model="passcode" label="Passcode"/>
      <q-btn label="Create Contract" color="blue" @click="createContract"/>
    </div>

    <div v-if="contract" class="my-card">
      <div class="text-h5">Contract Details</div>
      <img :src="qrCodeImg"/>
      <div>Contract address: {{ contract.address }}</div>
      <div>Balance: {{ balance }}</div>
      <q-btn label="Fetch balance" color="blue" @click="fetchBalance"/>
      <q-dialog v-model="isFetchingBalance">
        <q-card>
          <q-card-section>
            Fetching balance
            <q-spinner/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <div class="my-card">
      <div class="text-h5">Claim from Vault</div>
      <div v-if="claimTxid">
        Claim Transaction ID: {{ claimTxid }}
        <q-btn label="View in explorer" :href="'https://explorer.bch.ninja/tx/' + claimTxid" target="_blank"/>
      </div>
      <div v-if="claimError">
        Claim Error: {{ claimError }}
      </div>
      <q-input v-model="claimRecipient" autogrow label="Recipient Address"/>
      <q-input v-model="claimPasscode" label="Passcode"/>
      <q-btn label="Claim" color="blue" @click="claimFromVault"/>

      <q-dialog v-model="isClaiming">
        <q-card>
          <q-card-section>
            Claiming from vault
            <q-spinner/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

import { Contract, ElectrumNetworkProvider, TransactionBuilder } from 'cashscript';
import { addressToPkhash } from 'src/lib/common.js';
import PasswordVaultArtifact from 'src/contracts/PasswordVault.json' with { type: 'json' };

import QRCode from 'qrcode';

const contract = ref();
const payout = ref(0);
const ownerAddress = ref('');
const passcode = ref('');

function createContract() {
  const provider = new ElectrumNetworkProvider('mainnet');
  const contractParameters = [
    BigInt(payout.value),
    addressToPkhash(ownerAddress.value),
    passcode.value,
  ];

  const passwordVaultContract = new Contract(
    PasswordVaultArtifact,
    contractParameters,
    { provider, addressType: 'p2sh32' },
  );
  contract.value = passwordVaultContract;
  generateAddressQrCode();
}

onMounted(function() {
  payout.value = 4700;
  ownerAddress.value = 'bitcoincash:qq4sh33hxw2v23g2hwmcp369tany3x73wugtc9p69g';
  passcode.value = 'my-passcode';
  createContract();
})

const isFetchingBalance = ref(false);
const balance = ref(null);
async function fetchBalance() {
  try {
    isFetchingBalance.value = true;
    balance.value = await contract.value.getBalance();
  } finally {
    isFetchingBalance.value = false;
  }
}

const qrCodeImg = ref();
async function generateAddressQrCode() {
  qrCodeImg.value = await QRCode.toDataURL(contract.value.address);
}

const claimRecipient = ref('');
const claimPasscode = ref('');

const isClaiming = ref(false);
const claimTxid = ref('');
const claimError = ref('');

async function claimFromVault() {
  try {
    isClaiming.value = true;
    const provider = new ElectrumNetworkProvider('mainnet');
    const transactionBuilder = new TransactionBuilder({ provider });
  
    const utxos = await contract.value.getUtxos();
    const utxo = utxos[0];
  
    const inputSatoshis = utxo.satoshis;
    transactionBuilder.addInput(utxo, contract.value.unlock.claim(claimPasscode.value))
  
    const amountToSend = BigInt(payout.value);
    transactionBuilder.addOutput({
      to: claimRecipient.value,
      amount: amountToSend,
    })
  
    const remainingSatoshis = inputSatoshis - 300n - amountToSend;
    if (remainingSatoshis > 546n) {
      transactionBuilder.addOutput({
        to: contract.value.address,
        amount: remainingSatoshis,
      })
    }

    const transactionDetails = await transactionBuilder.send();
    claimTxid.value = transactionDetails.txid;
    claimError.value = '';
  } catch(error) {
    claimError.value = String(error);
  } finally {
    isClaiming.value = false;
  }
}
</script>
<style scoped>
.page-container {
  max-width: min(600px, 95vw);
  padding: 16px;
  margin-left: auto;
  margin-right: auto;
}

.my-card {
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.my-card > *:not(:first-child) {
  margin-top: 16px;
}
</style>
