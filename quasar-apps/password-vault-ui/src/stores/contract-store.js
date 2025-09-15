import { defineStore } from 'pinia'
import { getBalance } from 'src/lib/common.js'
import { createContractInstance } from 'src/lib/contract'

export const useContractStore = defineStore('contract', {
  state: function() { // State of store kind of like data() { ... } in vue components
    return {
      contractAddress: '',
      payoutAmount: 0,
      ownerAddress: '',
      passcode: '',
      balance: 0,
    } 
  },
  getters: { // getters in store => computed in vue components
    payoutAmountBch() {
      return this.parameters.payoutAmount / 100_000_000
    },
    bchBalance() {
      return this.balance / 100_000_000
    },
  },
  actions: { // actions => methods in vue components
    saveContract(payoutAmount, ownerAddress, passcode) {
      const contract = createContractInstance(payoutAmount, ownerAddress, passcode);
      this.$patch({
        contractAddress: contract.address,
        payoutAmount: parseInt(payoutAmount),
        ownerAddress: ownerAddress,
        passcode: passcode,
        balance: 0,
      })
    },
    async refreshBalance() {
      const balance = await getBalance(this.contractAddress);
      this.balance = parseInt(balance);
    }
  },
})
