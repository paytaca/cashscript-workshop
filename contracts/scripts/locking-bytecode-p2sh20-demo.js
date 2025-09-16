import { 
    ElectrumNetworkProvider, 
    Contract,
    TransactionBuilder, 
    MockNetworkProvider, 
    randomUtxo
} from 'cashscript';
import { binToHex, hexToBin, sha256, stringify } from '@bitauth/libauth';
import { compileFile } from 'cashc';

const provider = new MockNetworkProvider();
const artifact = compileFile(new URL('../examples/LockingBytecodeP2SH20Demo.cash', import.meta.url));
// console.log('Artifact', stringify(artifact))
const contract = new Contract(artifact, [], {provider, addressType: 'p2sh20'});


// console.log("Contract address: " + contract.address);
// console.log("Contract balance: " + await contract.getBalance());
provider.addUtxo(contract.address, randomUtxo({satoshis:  10_000n}))
const utxos = await contract.getUtxos()

// console.log('Contract', contract.getBalance())
const scriptHash = binToHex(sha256.hash(contract.bytecode))
// console.log('Script Hash', contract.redeemScript)

// process.exit(0)
const relayFee = 690n
const sentSatoshis = 2000n
const change = utxos[0]?.satoshis - sentSatoshis - relayFee

// console.log('Contract Address', contract.address)

async function spend() {
  try {
    const r =  new TransactionBuilder({provider})
    .addInput(utxos[0], contract.unlock.spend())
    .addOutput({
      to:'bchtest:qqvqtkrzrg6u2c4wgau6f6nycwj98qa8kya52sefvd',
      amount:  sentSatoshis
    })
    .addOutput({
      to: contract.address,
      amount:  change
    })
    // .addOutput({
    //   to: 'bchtest:qqvqtkrzrg6u2c4wgau6f6nycwj98qa8kya52sefvd',
    //   amount:  change
    // })
    .debug()
    console.log('Result', r)
  } catch (error) {
    console.log('Error', stringify(error))
  }
  
}


if (utxos.length > 0 ) {
  const result = await spend()
  console.log("Transaction sent successfully:", result);
} else {
  console.log("No UTXOs found for the contract, skipping transaction.");
}

