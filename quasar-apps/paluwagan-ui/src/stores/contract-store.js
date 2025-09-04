import { defineStore } from 'pinia'
import { createContractInstance } from 'src/lib/contract'

export const useContractStore = defineStore('contract', {
  state: () => ({
    // Data about contract: add parameters, address, balance
    address: '',
    parameters: {
      payoutAmount: 0,
      ownerAddress: '',
      passcode: '',
    },
    balance: 0,
  }),
  getters: {
    // provide getter functions
    contractInstance() {
      return createContractInstance(
        this.parameters.payoutAmount,
        this.parameters.ownerAddress,
        this.parameters.passcode,
      )
    },
    bchBalance() {
      return this.balance / 10 ** 8
    },
  },
  actions: {
    // Add actions: loadContract(...parameters), refreshBalance()
    saveContract(payoutAmount, ownerAddress, passcode) {
      const contract = createContractInstance(payoutAmount, ownerAddress, passcode);
      this.$patch({
        address: contract.address,
        parameters: {
          payoutAmount: parseInt(payoutAmount),
          ownerAddress: ownerAddress,
          passcode: passcode,
        },
        balance: 0,
      })
    },
    async refreshBalance() {
      const balance = await this.contractInstance.getBalance();;
      this.balance = parseInt(balance);
    }
  },
})
