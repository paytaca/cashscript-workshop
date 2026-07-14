import { Contract, ElectrumNetworkProvider, TransactionBuilder } from "cashscript"
import { compileFile } from "cashc"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"
import { toBytes20 } from "./utils.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const provider = new ElectrumNetworkProvider("chipnet")


const getContract = ({ amount, recipient, period }) => {
    const artifact = compileFile(resolve(__dirname, "../PeriodicPayout.cash"))
    const args = [ amount, recipient, period ]
    const options = {
        addressType: "p2sh32",
        provider,
    }
    return new Contract(artifact, args, options)
}


const withdraw = async () => {
    const amount = 5000n
    const period = 900_000n
    const pubkeyHex = "028ee37691ad7a3e51b5ee217699ad5ef262d88d34101651747e812dd015c66fdd"
    const recipientAddress = "bchtest:qrzpkmyar4vj74weq5v648s4zuy9r8rdac8rqhccyw"
    const recipient = toBytes20(pubkeyHex)
    const contract = getContract({ amount, recipient, period })

    const utxos = await contract.getUtxos()

    // Find the NFT UTXO (carries the unlock time state)
    const nftUtxo = utxos.find(utxo => utxo.token && utxo.token.nft)
    if (!nftUtxo) throw new Error("No NFT UTXO found. Fund the contract with an NFT first.")

    // Find BCH UTXOs for the payout balance
    const bchUtxos = utxos.filter(utxo => !utxo.token)
    if (bchUtxos.length === 0) throw new Error("No BCH UTXOs found. Fund the contract with BCH first.")

    // Extract current unlock time from NFT commitment and compute next
    const currentUnlockTime = parseInt(nftUtxo.token.nft.commitment, 16)
    const nextUnlockTime = currentUnlockTime + Number(period)
    const nextUnlockTimeHex = nextUnlockTime.toString(16).padStart(16, "0")

    const bchUtxo = bchUtxos[0]
    const relayFee = 1000n

    const builder = new TransactionBuilder({ provider })

    // Contract requires: input 0 = NFT, input 1 = BCH
    builder.addInput(nftUtxo, contract.unlock.withdrawFunds())
    builder.addInput(bchUtxo, contract.unlock.withdrawFunds())

    // Output 0: NFT returned to contract with updated commitment
    builder.addOutput({
        to: contract.address,
        amount: nftUtxo.satoshis,
        token: {
            category: nftUtxo.token.category,
            amount: 0n,
            nft: {
                capability: nftUtxo.token.nft.capability,
                commitment: nextUnlockTimeHex,
            },
        },
    })

    // Output 1: Payment to recipient
    builder.addOutput({
        to: recipientAddress,
        amount,
    })
    const currentBlock = await provider.getBlockHeight()
    builder.setLocktime(currentBlock)

    const tx = await builder.send()
    console.log("Transaction sent:", tx)
}


withdraw()
