import QRCode from 'qrcode'
import { Contract, ElectrumNetworkProvider, TransactionBuilder } from "cashscript";
// if 'with' doesn't work, try 'assert'
import Artifact from "./Artifact.json" with { type: 'json' }

const provider = new ElectrumNetworkProvider('chipnet');

const seedNumber = 12345n // whatever you want to use here

const constructorArgs = [
  seedNumber, 
]

const contract = new Contract(
  Artifact,
  constructorArgs,
  { provider, addressType: 'p2sh32' }
)

console.log(contract.address)

const qrCodeData = await QRCode.toString(contract.address, { type: 'terminal' }, )
console.log(qrCodeData)


const utxos = await contract.getUtxos();
console.log('UTXOS', utxos)

const txBuilder = new TransactionBuilder({ provider })

const utxo = utxos[0];
txBuilder.addInput(
  utxo,
  contract.unlock.spend(seedNumber - 99999n),
)

const TX_FEE = 300n;
const toSendAmount = utxo[0].satoshis - TX_FEE;
txBuilder.addOutput({
  to: 'bitcoincash:qq4sh33hxw2v23g2hwmcp369tany3x73wugtc9p69g',
  amount: toSendAmount
})

const result = await txBuilder.send()
console.log(result)
