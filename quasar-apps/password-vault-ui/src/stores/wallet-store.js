import { defineStore } from "pinia";
import { getBalance } from "src/lib/common";
import { Wallet } from "src/lib/wallet";

// This is an example of a pinia store
// https://pinia.vuejs.org/core-concepts/#Defining-a-Store

export const useWalletStore = defineStore('wallet', {
  // Store variables are declared in state along with initial values
  // Like 'data()' in components
  // https://pinia.vuejs.org/core-concepts/state.html
  state: () => ({
    mnemonic: '',
    address: '',
    satoshiBalance: 0,
  }),

  // Getters are like 'computed' in components
  // https://pinia.vuejs.org/core-concepts/getters.html
  getters: {
    bchBalance() {
      return this.satoshiBalance / 100_000_000;
    }
  },


  // Getters are like 'methods' in components
  // https://pinia.vuejs.org/core-concepts/actions.html
  actions: {
    setMnemonic(mnemonic) {
      const wallet = new Wallet(mnemonic);
      const walletData = wallet.generate();
      this.$patch({
        mnemonic: wallet.mnemonic,
        address: walletData.receiving.address,
        satoshiBalance: 0,
      })
    },
    async refreshBalance() {
      const balance = await getBalance(this.address);
      this.satoshiBalance = parseInt(balance);
    }
  }
})
