import { 
    Contract,
    TransactionBuilder, 
    MockNetworkProvider, 
    randomUtxo
} from 'cashscript';
import { binToHex, sha256, stringify } from '@bitauth/libauth';
import { compileFile } from 'cashc';

const provider = new MockNetworkProvider();
const artifact = compileFile(new URL('../examples/LockingBytecodeP2SH20Demo.cash', import.meta.url));
const contract = new Contract(artifact, [], {provider, addressType: 'p2sh20'});
provider.addUtxo(contract.address, randomUtxo({satoshis:  10_000n}))
const utxos = await contract.getUtxos()
const scriptHash = binToHex(sha256.hash(contract.bytecode))
const relayFee = 690n
const sentSatoshis = 2000n
const change = utxos[0]?.satoshis - sentSatoshis - relayFee

async function spend() {
  try {
    const r =  new TransactionBuilder({provider})
    .addInput(utxos[0], contract.unlock.spend())
    .addOutput({
      to:'bchtest:qqvqtkrzrg6u2c4wgau6f6nycwj98qa8kya52sefvd',
      amount:  sentSatoshis
    })
    // .addOutput({
    //   to: contract.address,
    //   amount:  change
    // })
    .addOutput({
      to: 'bchtest:qqvqtkrzrg6u2c4wgau6f6nycwj98qa8kya52sefvd',
      amount:  change
    })
    .debug()
    console.log('Transaction Successful')
  } catch (error) {
    console.log('Transaction error')
  } 
}

if (utxos.length > 0 ) {
  const result = await spend()
} else {
  console.log("No UTXOs found for the contract, skipping transaction.");
}

