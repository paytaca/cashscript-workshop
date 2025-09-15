import { 
    ElectrumNetworkProvider, 
    Contract,
    TransactionBuilder, 
    MockNetworkProvider, 
    randomUtxo
} from 'cashscript';
import { stringify } from '@bitauth/libauth';
import { compileFile } from 'cashc';

const provider = new MockNetworkProvider();
const artifact = compileFile(new URL('../exercises/SimpleLottery.cash', import.meta.url));
const contract = new Contract(artifact, [], {provider});

console.log("Contract address: " + contract.address);
console.log("Contract balance: " + await contract.getBalance());
provider.addUtxo(contract.address, randomUtxo({satoshis:  10_000n}))
const utxos = await contract.getUtxos()

console.log('Contract', contract.getBalance())
const relayFee = 690n

const rewardForMe = utxos[0]?.satoshis - relayFee

let luckyNumberGuess


for (let luckyNumber = 0; luckyNumber < 100; luckyNumber++) {
    // console.log(`Processing luckyNumber: ${luckyNumber}`)
    try {
    const r = new TransactionBuilder({provider})
        .addInput(utxos[0], contract.unlock.play(BigInt(luckyNumber)))
        .addOutput({
        to: contract.address,
        amount:  utxos[0].satoshis - relayFee 
    })
    .debug();
    luckyNumberGuess = luckyNumber
    break
} catch (error) {
    console.log('Error', error)
}
}


async function playLottery(luckyNumberGuess) {
  const r = await new TransactionBuilder({provider})
    .addInput(utxos[0], contract.unlock.play(BigInt(luckyNumberGuess)))
    .addOutput({
      to:'bitcoincash:qq6yrnn8mmnnwwq7py0pa77cag8e00w7k523malpd3',
      amount:  rewardForMe
    })
    .send();
  console.log("Result: ", stringify(r));
}

console.log('Good Guess', luckyNumberGuess)
// console.log('Good nonce', nonceGuess)

if (utxos.length > 0 && luckyNumberGuess) {
  const result = await playLottery(luckyNumberGuess)
  console.log("Transaction sent successfully:", result);
} else {
  console.log("No UTXOs found for the contract, skipping transaction.");
}

