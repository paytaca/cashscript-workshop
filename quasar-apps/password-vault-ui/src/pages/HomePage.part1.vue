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
      <div>Contract address: {{ contract.address }}</div>
    </div>
  </div>
</template>
<script setup>
import QRCode from 'qrcode';
import { ref, onMounted } from 'vue';

import { Contract, ElectrumNetworkProvider, TransactionBuilder } from 'cashscript';
import { electrum } from "src/lib/electrum.js"
import { addressToPkhash } from 'src/lib/common.js';
import PasswordVaultArtifact from 'src/contracts/PasswordVault.json' with { type: 'json' }

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
}

onMounted(function() {
  payout.value = 4700;
  ownerAddress.value = 'bitcoincash:qq4sh33hxw2v23g2hwmcp369tany3x73wugtc9p69g';
  passcode.value = 'my-passcode';
  createContract();
})
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

.q-dialog .my-card {
  background-color: white;
}

.my-card > *:not(:first-child) {
  margin-top: 16px;
}
</style>
