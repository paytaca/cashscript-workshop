import { defineStore } from "pinia";
import { getBalance } from "src/lib/common";
import { Wallet } from "src/lib/wallet";

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    mnemonic: '',
    address: '',
    balance: 0,
  }),
  actions: {
    setMnemonic(mnemonic) {
      const wallet = new Wallet(mnemonic);
      const walletData = wallet.generate();
      this.$patch({
        mnemonic: wallet.mnemonic,
        address: walletData.receiving.address,
        balance: 0,
      })
    },
    async refreshBalance() {
      const balance = await getBalance(this.address);
      this.balance = parseInt(balance);
    }
  }
})
