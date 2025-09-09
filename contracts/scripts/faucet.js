import { compileFile } from "cashc"
import { ElectrumNetworkProvider, Contract } from "cashscript"

const ownerPubkeyHash = '06d425ca0f130dfe7230b79da691d8d333554cb5'
const passcode = 'cashscript-is-awesome'
const payout = 1000n

const artifact = compileFile("../answers/faucet_answer.cash")
const provider = new ElectrumNetworkProvider("mainnet")
const params = [
    payout,
    ownerPubkeyHash,
    passcode
]
const contract = new Contract(artifact, params, { provider })
console.log(contract.address)