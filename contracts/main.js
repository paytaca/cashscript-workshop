import { compileFile } from "cashc"
import { Contract, ElectrumNetworkProvider, TransactionBuilder } from "cashscript"
import { WalletGenerator } from "./wallet.js"


const generatePubkeyHashes = async () => {
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
    return members
}

const run = async () => {
    const artifact = compileFile("./contract.cash")
    const provider = new ElectrumNetworkProvider("chipnet")
    const pubkeyHashes = await generatePubkeyHashes()
    const nftTokenCategory = '12345678901234567890123456789012345'
    const totalPotAmount = 100_000n
    const confirmations = 1n
    const params = [
        ...pubkeyHashes,
        nftTokenCategory,
        totalPotAmount,
        confirmations,
    ]

    const contract = new Contract(artifact, params, { provider })
    
    const balance = await contract.getBalance()
    const utxos = await contract.getUtxos()
    
    console.log('Params: ', params)
    console.log('Address: ', contract.address)
    console.log('Balance: ', balance)
    console.log('UTXOs: ', utxos)

    // const transactionBuilder = new TransactionBuilder({ provider })
    // const unlocker = contract.unlock.redeem()
    // const recipient = 'bchtest:qru9t33x5dpaauh2npm7wyntnvqsnenf8vypnqj4vz'
    // const fee = 1000n

    // // sequence value here is number of confirmations
    // transactionBuilder.addInputs(utxos, unlocker, { sequence: 1 })
    // transactionBuilder.addOutput({ to: contract.address, amount: balance - fee })

    // const transaction = await transactionBuilder.send()
    // console.log(transaction)
}

run()