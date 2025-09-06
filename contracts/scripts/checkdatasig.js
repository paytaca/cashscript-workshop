

import { binToHex, decodePrivateKeyWif, secp256k1, sha256, utf8ToBin} from '@bitauth/libauth'
import { Contract, ElectrumNetworkProvider, MockNetworkProvider, randomUtxo, TransactionBuilder} from 'cashscript';
import { compileFile } from 'cashc';
import { URL } from 'url';

function getData () {

    const wif = 'cNPyTVgxVCPz9TK3yECB8zXKmcbiibVAMmFfWtwWQTpt2JnuWSwM'
    const publicKey = '0257db19a9b32e135b2f98d2a66892b60d7afefdb12f74da150fd3805423b529d1'

    const privateKey = decodePrivateKeyWif(wif)
    const input = 'approve'
    const schnorr = binToHex(secp256k1.signMessageHashSchnorr(privateKey.privateKey, sha256.hash('utf8ToBin(input)')))
    const der = binToHex(secp256k1.signMessageHashDER(privateKey.privateKey, sha256.hash(utf8ToBin(input))))

    // const str = "approve";            // Your string
    // const encoder = new TextEncoder(); // Create a TextEncoder
    // const bytes = encoder.encode(str); // Convert string to bytes

    // console.log(bytes);
    // Uint8Array(7) [97, 112, 112, 114, 111, 118, 101]

    return {
        schnorr,
        der,
        publicKey
    }
    
}


async function buildTransaction () {

    const data = getData()
    // Compile the HodlVault contract to an artifact object
    const artifact = compileFile(new URL('../checkdatasig.cash', import.meta.url));

    console.log(artifact)
    // // Initialise a network provider for network operations on CHIPNET
    const provider = new ElectrumNetworkProvider('chipnet');

    // // Instantiate a new contract using the compiled artifact and network provider
    // // AND providing the constructor parameters
    const parameters = [data.publicKey];
    const contract = new Contract(artifact, parameters, { provider });

    console.log('Contract Address', contract.address)

    // provider.addUtxo(contract.address, randomUtxo({
    //     satoshis: 10000n
    // }));

    const utxos = await contract.getUtxos()

    console.log('Contract Balance', await contract.getBalance())

    console.log('Signature: ', data.schnorr)
    
    const balance = await contract.getBalance()
    const amountToSend = 1000n
    const change = balance - amountToSend - 500n

    const r = await new TransactionBuilder({ provider })
            .addInput(utxos[0], contract.unlock.spend(data.schnorr)) // contract function to invoke
            .addOutput({
                to: 'bchtest:qq6yrnn8mmnnwwq7py0pa77cag8e00w7k5wrl6ak2d',
                amount:  amountToSend
            })
            .addOutput({
                to: contract.address,
                amount:  change
            })
            .send();
    
    console.log('R', r)
    // console.log('New balance', await contract.getBalance())

}


buildTransaction()