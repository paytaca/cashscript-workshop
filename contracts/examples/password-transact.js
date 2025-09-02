import { Contract, MockNetworkProvider, randomUtxo, TransactionBuilder } from "cashscript"
import PasswordArtifact from './password.json' with { type: 'json' }


// setup contract arguments based on contract parameters
const contractArgs = ['change_or_keep_password'] // change or keep password

// set up network provider
const provider = new MockNetworkProvider()

// compile contract
const contract = new Contract(PasswordArtifact, contractArgs, { provider })


// add random utxo
provider.addUtxo(
  contract.address,
  randomUtxo({ satoshis: 10_000n })
)

// instantiate Transaction Builder
const transactionBuilder = new TransactionBuilder({ provider })

// get the utxos of the contract
const utxos = await contract.getUtxos()

// declare the output
const outputs = [
  {
    to: 'bchtest:qzxu7zvdgquka95v83m6u8ywzrsdk4vah5wrmerdu0',
    amount: 5_000n
  },
  // change address (back to contract)
  {
    to: contract.address,
    amount: 10_000n - 5_000n - 1100n
  }
]

// build the transaction 
const tx = transactionBuilder
  .addInputs(utxos, contract.unlock.spend('change_or_keep_password'))
  .addOutputs(outputs)