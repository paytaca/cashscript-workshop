import { defineStore } from 'pinia'
import { compileContract } from 'src/lib/contract'

export const useContractStore = defineStore('contract', {
  state: () => ({
    // Data about contract: add parameters, address, balance
    address: '',
    parameters: {
      members: [],
      potAmount: 0,
      period: 0,
    },
    balance: 0,
  }),
  getters: {
    // provide getter functions
    contractInstance() {
      return compileContract(
        this.parameters.members,
        this.parameters.potAmount,
        this.parameters.period,
      )
    }
  },
  actions: {
    // Add actions: loadContract(...parameters), refreshBalance()
    saveContract(members, potAmount, period) {
      const contract = compileContract(members, potAmount, period);
      this.$patch({
        address: contract.address,
        parameters: {
          members,
          potAmount: parseInt(potAmount),
          period: parseInt(period),
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
