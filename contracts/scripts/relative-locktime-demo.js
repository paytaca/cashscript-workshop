import { 
    Contract,
    TransactionBuilder, 
    MockNetworkProvider, 
    randomUtxo
} from 'cashscript';
import { compileFile } from 'cashc';

const provider = new MockNetworkProvider();
const artifact = compileFile(new URL('../examples/RelativeLockTimeDemo.cash', import.meta.url));
const contract = new Contract(artifact, [], {provider, addressType: 'p2sh32'});
provider.addUtxo(contract.address, randomUtxo({satoshis:  10_000n}))
const utxos = await contract.getUtxos()
const relayFee = 690n
const sentSatoshis = 2000n
const change = utxos[0]?.satoshis - sentSatoshis - relayFee

console.log('Contract Address', contract.address)

async function spend() {
  try {
    utxos[0].nSequence = 1;
    const r =  new TransactionBuilder({provider})
    .addInput(utxos[0], contract.unlock.spend())
    .addOutput({
      to:'bchtest:qq6yrnn8mmnnwwq7py0pa77cag8e00w7k5wrl6ak2d',
      amount:  sentSatoshis
    })
    // .addOutput({
    //   to: 'bchtest:qqvqtkrzrg6u2c4wgau6f6nycwj98qa8kya52sefvd',
    //   amount:  change
    // })
    // .addOutput({
    //   to: contract.address,
    //   amount:  change
    // })
    .debug()
    console.log('Transaction success')
  } catch (error) {
    console.log('Transaction Error')
  }
  
}


if (utxos.length > 0 ) {
  const result = await spend()
  console.log("Transaction sent successfully:", result);
} else {
  console.log("No UTXOs found for the contract, skipping transaction.");
}

