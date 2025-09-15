

import { binToHex, decodePrivateKeyWif, hexToBin, secp256k1, sha256, utf8ToBin} from '@bitauth/libauth'
import { Contract, ElectrumNetworkProvider, MockNetworkProvider, randomUtxo, TransactionBuilder} from 'cashscript';
import { compileFile } from 'cashc';
import { URL } from 'url';


async function buildTransaction (send) {
    // Compile the HodlVault contract to an artifact object
    const artifact = compileFile(new URL('../exercises/SecretNumberExercise.cash', import.meta.url));

    // // Initialise a network provider for network operations on CHIPNET
    const provider = new ElectrumNetworkProvider('chipnet');

    // // Instantiate a new contract using the compiled artifact and network provider
    // // AND providing the constructor parameters
    const publicKey = '0257db19a9b32e135b2f98d2a66892b60d7afefdb12f74da150fd3805423b529d1'
    const num1 = 10n
    const num2 = 5n
    const diff = 10n - 5n
    
    let diffInHex = (diff).toString(16);

    if (diffInHex.length % 2) diffInHex = "0" + diffInHex; // If odd length pad to even length
    
    const diffHashInHex = sha256.hash(hexToBin(diffInHex))

    console.log('Diff', binToHex(diffHashInHex))
    
    const parameters = [publicKey, diffHashInHex];
    const contract = new Contract(artifact, parameters, { provider });

    const utxos = await contract.getUtxos()

    console.log('Contract Address', contract.address)
    console.log('Contract Balance', await contract.getBalance())
    console.log('Public Key: ', publicKey)

    const balance = await contract.getBalance()
    const amountToSend = balance - 1000n

    const transaction = new TransactionBuilder({ provider })
            .addInput(utxos[0], contract.unlock.unlockUsingSecretNumbers(num1, num2)) // contract function to invoke
            .addOutput({
                to: 'bchtest:qq6yrnn8mmnnwwq7py0pa77cag8e00w7k5wrl6ak2d',
                amount:  amountToSend
            })
            // .addOutput({
            //     to: contract.address,
            //     amount:  change
            // })
    
    if (send) {
        const sendResult = transaction.send()
        console.log('Transaction Send Result: ', result)
        return sendResult
    }
    const buildResult = transaction.build()
    console.log('Transaction Build Result', buildResult);
    return buildResult
}


buildTransaction(false);


