import { Contract, ElectrumNetworkProvider, gatherBchUtxos, TransactionBuilder } from "cashscript"
import { compileFile } from "cashc"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"
import { toBytes20 } from "./utils.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const provider = new ElectrumNetworkProvider("chipnet")


const getContract = ({ amount, recipient }) => {
    const artifact = compileFile(resolve(__dirname, "../BasicPeriodicPayout.cash"))
    const args = [ amount, recipient ]
    const options = {
        addressType: "p2sh32",
        provider,
    }
    return new Contract(artifact, args, options)
}


const withdraw = async () => {
    const amount = 5000n
    const pubkeyHex = "028ee37691ad7a3e51b5ee217699ad5ef262d88d34101651747e812dd015c66fdd"
    const recipientAddress = "bchtest:qrzpkmyar4vj74weq5v648s4zuy9r8rdac8rqhccyw"
    const recipient = toBytes20(pubkeyHex)
    const contract = getContract({ amount, recipient })

    const contractUtxos = await contract.getUtxos()
    const bchUtxos = gatherBchUtxos(contractUtxos, amount)
    const input = bchUtxos[0]

    const relayFee = 1000n
    const contractBalance = input.satoshis
    const excessFunds = contractBalance - amount - relayFee

    const builder = new TransactionBuilder({ provider })
    builder.addInput(input, contract.unlock.withdrawFunds())
    builder.addOutput({ to: recipientAddress, amount })

    if (excessFunds >= 546n) {
        builder.addOutput({ to: contract.address, amount: excessFunds })
    }

    const tx = await builder.send()
    console.log("Transaction sent:", tx)
}


withdraw()