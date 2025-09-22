<template>
  <q-card class="q-pa-md">
    <q-form @submit="$emit('submit', mnemonic, passphrase, savePassphrase)" class="q-gutter-y-md">
      <div v-if="hasEncryptedMnemonic" class="row items-center justify-between">
        Found encrypted mnemonic in local storage
        <q-toggle  v-model="useNewMnemonic" label="Use new mnemonic"/>
      </div>
      <q-input v-if="!hasEncryptedMnemonic || useNewMnemonic" v-model="mnemonic" label="Mnemonic"/>
      <q-input v-model="passphrase" label="Passphrase"/>
      <q-checkbox v-model="savePassphrase" label="Save passphrase"/>
      <q-btn label="Save" type="submit" color="blue" class="full-width"/>
    </q-form>

    <q-btn
      flat
      padding="sm"
      no-caps
      label="More info"
      href="https://en.bitcoin.it/wiki/BIP_0038#:~:text=the%20key%20record.-,Motivation,must%20be%20trustworthy%20and%20trusted."
      target="_blank"
      class="q-mt-md"
      style="text-decoration: underline; margin-left: auto;"
    />
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MnemonicForm',

  data() {
    return {
      mnemonic: '',
      passphrase: '',
      savePassphrase: false,

      hasEncryptedMnemonic: false,
      useNewMnemonic: false,
    }
  },

  mounted() {
    const encryptedMnemonic = window.localStorage.getItem('encryptedMnemonic');
    this.hasEncryptedMnemonic = Boolean(encryptedMnemonic);
  }
})
</script>