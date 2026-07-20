import { ElectrumNetworkProvider, SignatureTemplate, TransactionBuilder } from "cashscript"
import BCHJS from "@psf/bch-js"

const bchjs = new BCHJS()
const provider = new ElectrumNetworkProvider("chipnet")

const deriveWallet = async (seedPhrase) => {
    const seed = await bchjs.Mnemonic.toSeed(seedPhrase)
    const hdNode = await bchjs.HDNode.fromSeed(seed, 'testnet')
    const derivedNode = bchjs.HDNode.derivePath(hdNode, "m/44'/145'/0'/0/0")

    return {
        address: bchjs.HDNode.toCashAddress(derivedNode),
        privateKeyWIF: bchjs.HDNode.toWIF(derivedNode),
    }
}

const reverseHex = (hex) => {
    return hex.match(/.{2}/g).reverse().join('')
}

const mintNftFromBch = async () => {
    const seedPhrase = "extend topple venture nerve trophy loop ostrich plastic deputy scrap like warm"
    const recipientAddress = "bchtest:rwdtg47tlm7aq9arqph49tut0yfw8x7xfqlwe2kt3t9u6ku6jyj0uefq2es8r"
    const unlockBlock = 315317n
    // const period = 5n

    const nextUnlockBlock = unlockBlock
    const commitmentHex = nextUnlockBlock.toString(16).padStart(16, "0")
    console.log("Unlock block:", nextUnlockBlock)
    console.log("Commitment:", commitmentHex)

    const wallet = await deriveWallet(seedPhrase)
    console.log("Wallet:", wallet.address)

    const utxos = await provider.getUtxos(wallet.address)
    const bchUtxo = utxos.find(utxo => !utxo?.token)
    if (!bchUtxo) {
        console.log("No BCH UTXOs")
        return
    }

    console.log("Using BCH UTXO:", bchUtxo.txid, "vout:", bchUtxo.vout)
    console.log("Category:", bchUtxo.txid)

    const txBuilder = new TransactionBuilder({ provider })
    const signature = new SignatureTemplate(wallet.privateKeyWIF)
    const category = '4ca19b60c3016cae28bd0e173eaadd0e0a46b0fe2b1c69c15ce2554203dd9584'
    const mintingNftUtxo = utxos.find(utxo => utxo?.token?.category === category)
    const walletTokenAddress = "bchtest:zrcqnjmpyf2nfql4q3lk7x43m9fvjg0c6uh6zq82xa"
    
    txBuilder.addInputs([ mintingNftUtxo, bchUtxo], signature.unlockP2PKH())

    txBuilder.addOutput({
        to: walletTokenAddress,
        amount: 1000n,
        token: {
            category: category,
            amount: 0n,
            nft: {
                capability: "minting",
                commitment: "",
            },
        },
    })


    // child NFT
    txBuilder.addOutput({
        to: recipientAddress,
        amount: 1000n,
        token: {
            category: category,
            amount: 0n,
            nft: {
                capability: "mutable",
                commitment: reverseHex(commitmentHex),
            },
        },
    })

    const change = bchUtxo.satoshis - 1000n - 2000n
    if (change >= 546n) {
        txBuilder.addOutput({ to: wallet.address, amount: change })
    }

    const txid = await txBuilder.send()
    console.log("\n=== NFT Minted Successfully ===")
    console.log("TXID:", txid)
    console.log("Category:", txid)
    console.log("Recipient:", recipientAddress)
    console.log("Capability: mutable")
    console.log("Commitment (unlock block):", nextUnlockBlock)
}


mintNftFromBch().catch(console.error)
