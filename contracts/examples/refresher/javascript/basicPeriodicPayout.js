import { compileFile } from "cashc"
import { Contract, ElectrumNetworkProvider, TransactionBuilder } from "cashscript"
import { dirname, resolve } from "path"

import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const artifact = compileFile(resolve(__dirname, "../BasicPeriodicPayout.cash"))
const amount = 5000n
const recipient = "e98739c14b763b81de99e3115fffeb2fcd8aba3e" // pkh hex
const recipientAddress = "bchtest:qr5cwwwpfdmrhqw7n833zhllavhumz468cjlgf6wgu"
const args = [amount, recipient]
const provider = new ElectrumNetworkProvider("chipnet")
const options = {
    provider: provider,
    addressType: "p2sh32",
}
const contract = new Contract(artifact, args, options)
// console.log(contract.address)
// console.log(contract.tokenAddress)

const utxos = await contract.getUtxos()
const balance = await contract.getBalance()
// console.log(balance)

const txnOptions = { provider: provider }
const builder = new TransactionBuilder(txnOptions)

const input = utxos[0]
builder.addInput(input, contract.unlock.withdrawFunds())
builder.addOutput({ to: recipientAddress, amount: amount })

const change = balance - amount - 1000n
if (change >= 546n) {
    builder.addOutput({ to: contract.address, amount: change })
}

const tx = await builder.send()
console.log("transaction sent: ", tx)