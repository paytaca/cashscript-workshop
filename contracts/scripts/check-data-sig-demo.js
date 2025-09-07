

import { binToHex, decodePrivateKeyWif, secp256k1, sha256, utf8ToBin} from '@bitauth/libauth'
import { Contract, ElectrumNetworkProvider, MockNetworkProvider, randomUtxo, TransactionBuilder} from 'cashscript';
import { compileFile } from 'cashc';
import { URL } from 'url';

function generateSampleSignatureAndPublicKeyData () {

    const wif = 'cNPyTVgxVCPz9TK3yECB8zXKmcbiibVAMmFfWtwWQTpt2JnuWSwM'
    const publicKey = '0257db19a9b32e135b2f98d2a66892b60d7afefdb12f74da150fd3805423b529d1'
    const privateKey = decodePrivateKeyWif(wif)
    const input = 'approve'
    const encoder = new TextEncoder(); // Create a TextEncoder
    const binFromUtf8ToBin = utf8ToBin(input)
    const binFromTextEncoder = encoder.encode(input); // Convert string to bytes
    console.log('Libauth', binToHex(binFromUtf8ToBin));
    console.log('Encoder', binToHex(binFromTextEncoder));
    const signature = binToHex(secp256k1.signMessageHashSchnorr(privateKey.privateKey, sha256.hash(utf8ToBin(input))))
    return {
        signature,
        publicKey
    }
    
}

async function buildTransaction (send) {
    const data = generateSampleSignatureAndPublicKeyData()
    // Compile the HodlVault contract to an artifact object
    const artifact = compileFile(new URL('../examples/CheckDataSigDemo.cash', import.meta.url));

    // // Initialise a network provider for network operations on CHIPNET
    const provider = new ElectrumNetworkProvider('chipnet');

    // // Instantiate a new contract using the compiled artifact and network provider
    // // AND providing the constructor parameters
    const parameters = [data.publicKey];
    const contract = new Contract(artifact, parameters, { provider });

    // provider.addUtxo(contract.address, randomUtxo({
    //     satoshis: 10000n
    // }));

    const utxos = await contract.getUtxos()

    console.log('Contract Address', contract.address)
    console.log('Contract Balance', await contract.getBalance())
    console.log('Signature: ', data.signature)
    console.log('Public Key: ', data.publicKey)
    
    const balance = await contract.getBalance()
    const amountToSend = 1000n
    const change = balance - amountToSend - 500n

    const transaction = new TransactionBuilder({ provider })
            .addInput(utxos[0], contract.unlock.spend(data.signature)) // contract function to invoke
            .addOutput({
                to: 'bchtest:qq6yrnn8mmnnwwq7py0pa77cag8e00w7k5wrl6ak2d',
                amount:  amountToSend
            })
            .addOutput({
                to: contract.address,
                amount:  change
            })
    
    if (send) {
        const sendResult = transaction.send()
        console.log('Transaction Send Result: ', result)
        return sendResult
    }
    const buildResult = transaction.build()
    console.log('Transaction Build Result', buildResult);
    return buildResult
}


buildTransaction(true);


