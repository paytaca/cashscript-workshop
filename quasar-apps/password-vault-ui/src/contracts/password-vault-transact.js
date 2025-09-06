import { MockNetworkProvider, TransactionBuilder, randomUtxo } from "cashscript"
import { passwordVaultContract } from './password-vault-instantiate.js'

// set up network provider
const provider = new MockNetworkProvider()

// add random utxo
provider.addUtxo(
  passwordVaultContract.address,
  randomUtxo({ satoshis: 10_000n })
)

// instantiate Transaction Builder
const transactionBuilder = new TransactionBuilder({ provider })

// get the utxos of the contract
const utxos = await passwordVaultContract.getUtxos()

// declare the output
const outputs = [
  {
    to: 'bchtest:qzxu7zvdgquka95v83m6u8ywzrsdk4vah5wrmerdu0',
    amount: 5_000n
  },
  // change address (back to contract)
  {
    to: passwordVaultContract.address,
    amount: 10_000n - 5_000n - 1100n
  }
]

// build the transaction 
const tx = transactionBuilder
  .addInputs(utxos, passwordVaultContract.unlock.claim('123456'))
  .addOutputs(outputs)