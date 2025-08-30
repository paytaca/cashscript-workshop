import { compileFile } from "cashc"
import { Contract, ElectrumNetworkProvider, TransactionBuilder } from "cashscript"


async function run () {
    const artifact = compileFile("./contract.cash")
    const params = []
    const provider = new ElectrumNetworkProvider("chipnet")
    const contract = new Contract(artifact, params, { provider })
    // console.log(contract.address)
    // const balance = await contract.getBalance()
    // console.log(balance)
    const utxos = await contract.getUtxos()
    // console.log(utxos)

    const transactionBuilder = new TransactionBuilder(provider)
    const unlocker = contract.unlock.redeem(1n)
    const recipient = 'bchtest:qru9t33x5dpaauh2npm7wyntnvqsnenf8vypnqj4vz'

    transactionBuilder.addInputs(utxos, unlocker)
    transactionBuilder.addOutput({ to: recipient, amount: 1000n })

    const transaction = await transactionBuilder.send()
    console.log(transaction)
}

run()