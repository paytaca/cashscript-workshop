import { defineStore } from 'pinia'

export const useContractStore = defineStore('contract', {
  state: () => ({
    // Data about contract: add parameters, address, balance
  }),
  getters: {
    // provide getter functions
  },
  actions: {
    // Add actions: loadContract(...parameters), refreshBalance()
  },
})
