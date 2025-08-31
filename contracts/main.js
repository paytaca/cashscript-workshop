import { compileFile } from "cashc"
import { Contract, ElectrumNetworkProvider, TransactionBuilder } from "cashscript"
import { WalletGenerator } from "./wallet.js"


const run = async () => {
    const artifact = compileFile("./contract.cash")
    const provider = new ElectrumNetworkProvider("chipnet")
    const mnemonic = 'random words for testing only'
    const wallets = [
        new WalletGenerator(mnemonic + '1'),
        new WalletGenerator(mnemonic + '2'),
        new WalletGenerator(mnemonic + '3'),
        new WalletGenerator(mnemonic + '4'),
        new WalletGenerator(mnemonic + '5'),
    ]
    const members = []
    for (const wallet of wallets) {
        const _wallet = await wallet.generate()
        // console.log(_wallet)
        members.push(_wallet.receiving.pkHash)
    }
    const params = [
        ...members,
        100_000n,  // total pot amount (20_000n contribution each member)
        1n,  // number of confirmations before it can get spent
    ]

    const contract = new Contract(artifact, params, { provider })
    
    const balance = await contract.getBalance()
    const utxos = await contract.getUtxos()
    
    console.log('Params: ', params)
    console.log('Address: ', contract.address)
    console.log('Balance: ', balance)
    console.log('UTXOs: ', utxos)

    const transactionBuilder = new TransactionBuilder({ provider })
    const unlocker = contract.unlock.redeem()
    const recipient = 'bchtest:qru9t33x5dpaauh2npm7wyntnvqsnenf8vypnqj4vz'
    const fee = 1000n

    // sequence value here is number of confirmations
    transactionBuilder.addInputs(utxos, unlocker, { sequence: 1 })
    transactionBuilder.addOutput({ to: contract.address, amount: balance - fee })

    const transaction = await transactionBuilder.send()
    console.log(transaction)
}

run()