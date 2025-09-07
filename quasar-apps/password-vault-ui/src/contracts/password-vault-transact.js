import { ElectrumNetworkProvider, TransactionBuilder } from "cashscript"
import { passwordVaultContract } from './password-vault-instantiate.js'

// set up network provider
const provider = new ElectrumNetworkProvider('mainnet')

// instantiate Transaction Builder
const transactionBuilder = new TransactionBuilder({ provider })

// get the utxos of the contract
const inputs = await passwordVaultContract.getUtxos()

// declare the output
const outputs = [
    {
        to: 'address', // replace address with your Paytaca wallet address
        amount: 3_000n
    },
    // change address (back to contract)
    {
        to: passwordVaultContract.address,
        amount: 5_000n - 3_000n - 300n
    }
]

// build the transaction 
const transaction = transactionBuilder
    .addInputs(
        // utxos
        inputs,
        // unlocker
        passwordVaultContract.unlock.claim('123456')
    )
    .addOutputs(outputs)