import { compileFile } from "cashc"
import { Contract, ElectrumNetworkProvider, TransactionBuilder } from "cashscript"
import { WalletGenerator } from "./wallet.js"


async function run () {
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
        /**
         30 days = 2,952,000 seconds
         2,952,000 / 512 = 5062.5
         So period = 5062 to represent 30 days blockchain-wise
         */
        5062n,  // 30 days in 512 second granularity
    ]

    const contract = new Contract(artifact, params, { provider })
    // console.log(params)
    // console.log(contract.address)
    
    // const balance = await contract.getBalance()
    // console.log(balance)
    // const utxos = await contract.getUtxos()
    // console.log(utxos)

    // const transactionBuilder = new TransactionBuilder(provider)
    // const unlocker = contract.unlock.redeem(1n)
    // const recipient = 'bchtest:qru9t33x5dpaauh2npm7wyntnvqsnenf8vypnqj4vz'

    // transactionBuilder.addInputs(utxos, unlocker)
    // transactionBuilder.addOutput({ to: recipient, amount: 1000n })

    // const transaction = await transactionBuilder.send()
    // console.log(transaction)
}

run()