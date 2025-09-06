import { MockNetworkProvider, TransactionBuilder, randomUtxo } from "cashscript"
import { faucetContract } from './faucet-instantiate.js'

// set up network provider
const provider = new MockNetworkProvider()

// add random utxo
provider.addUtxo(
  faucetContract.address,
  randomUtxo({ satoshis: 10_000n })
)

// instantiate Transaction Builder
const transactionBuilder = new TransactionBuilder({ provider })

// get the utxos of the contract
const utxos = await faucetContract.getUtxos()

// declare the output
const outputs = [
  {
    to: 'bchtest:qzxu7zvdgquka95v83m6u8ywzrsdk4vah5wrmerdu0',
    amount: 5_000n
  },
  // change address (back to contract)
  {
    to: faucetContract.address,
    amount: 10_000n - 5_000n - 1100n
  }
]

// build the transaction 
const tx = transactionBuilder
  .addInputs(utxos, faucetContract.unlock.claim('123456'))
  .addOutputs(outputs)