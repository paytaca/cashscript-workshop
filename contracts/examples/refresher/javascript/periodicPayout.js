import { compileFile } from "cashc"
import { Contract, ElectrumNetworkProvider, gatherBchUtxos, TransactionBuilder } from "cashscript"
import { dirname, resolve } from "path"

import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const reverseHex = (hex) => {
    return hex.match(/.{2}/g).reverse().join('')
}

const artifact = compileFile(resolve(__dirname, "../PeriodicPayout.cash"))
const amount = 5000n
const period = 5n
const category = '4ca19b60c3016cae28bd0e173eaadd0e0a46b0fe2b1c69c15ce2554203dd9584'
const recipient = "e98739c14b763b81de99e3115fffeb2fcd8aba3e" // pkh hex
const recipientAddress = "bchtest:qr5cwwwpfdmrhqw7n833zhllavhumz468cjlgf6wgu"
const args = [amount, recipient, period]
const provider = new ElectrumNetworkProvider("chipnet")
const options = {
    provider: provider,
    addressType: "p2sh32",
}
const contract = new Contract(artifact, args, options)
console.log(contract.address)
console.log(contract.tokenAddress)

const utxos = await contract.getUtxos()
const balance = await contract.getBalance()
console.log(balance)
console.log(utxos)

const txnOptions = { provider: provider }
const builder = new TransactionBuilder(txnOptions)

const nftUtxo = utxos.find(
    utxo => (
        utxo?.token?.category === category &&
        utxo?.token?.nft?.capability === 'mutable' &&
        utxo.txid === '575ed038b82384abe4fc35c7a0da68d39e16f0cede222a932d55b7c4cf412d94'
    )
)
const bchUtxos = gatherBchUtxos(utxos)
const finalBchUtxo = bchUtxos.utxos.find(utxo => utxo.txid === '6da12338cc070318b972ee7a982faef6dae02f847f48c8d0d53eda4dc511b90f') 
builder.addInput(nftUtxo, contract.unlock.withdrawFunds())
builder.addInput(finalBchUtxo, contract.unlock.withdrawFunds())

const currentUnlockTime = parseInt(reverseHex(nftUtxo.token.nft.commitment), 16)
const nextUnlockTime = currentUnlockTime + Number(period)
const updatedCommitment = nextUnlockTime.toString(16).padStart(16, "0")

builder.addOutput({
    to: contract.tokenAddress,
    amount: 1000n,
    token: {
        category: category,
        amount: 0n,
        nft: {
            capability: 'mutable',
            commitment: reverseHex(updatedCommitment),
        }
    }
})


builder.addOutput({ to: recipientAddress, amount: amount })
const change = finalBchUtxo.satoshis - amount - 1000n
if (change >= 546n) {
    builder.addOutput({ to: contract.address, amount: change })
}

const currentBlockHeight = await provider.getBlockHeight()
builder.setLocktime(currentBlockHeight)

const tx = await builder.send()
console.log("transaction sent: ", tx)