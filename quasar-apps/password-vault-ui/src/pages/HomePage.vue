<template>
  <div class="page-container">
    <div class="my-card">
      <div class="text-h5">{{ message }}</div>
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

const message = ref('Hello World!');
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