import {
  hash160,
  binToHex,
  deriveHdPrivateNodeFromBip39Mnemonic,
  deriveHdPath,
  deriveHdPathRelative,
  deriveHdPublicNode,
  publicKeyToP2pkhCashAddress,
  encodeBase58Address,
  encodePrivateKeyWif,
} from "@bitauth/libauth";
import { TransactionBuilder, ElectrumNetworkProvider, SignatureTemplate } from 'cashscript';
import { getTxSizeWithoutInputs } from "cashscript/dist/utils.js";
import { getUtxos } from "./common.js";


// This is an example of an Hierarchical Deterministic Wallet (HD Wallets)
// Similar to what Paytaca uses
// https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets

export class Wallet {
  constructor(mnemonic) {
    // Mnemonic is the 12 word seed phrase
    this.mnemonic = mnemonic

    // The standard derivation path of BCH wallets
    // https://learnmeabitcoin.com/technical/keys/hd-wallets/derivation-paths/
    this.derivationPath = "m/44'/145'/0'"
  }

  getMainNode() {
    const node = deriveHdPrivateNodeFromBip39Mnemonic(this.mnemonic);
    const mainNode = deriveHdPath(node, this.derivationPath);
    return mainNode;
  }

  getNodeAt(path='') {
    const mainNode = this.getMainNode()
    const node = deriveHdPathRelative(mainNode, path)
    return node
  }

  pubkeyToAddress({ publicKey, network, toTokenAddress }) {
    let prefix = 'bitcoincash';
    if (network === 'chipnet') {
      prefix = 'bchtest';
    }

    const encodeResult = publicKeyToP2pkhCashAddress({ publicKey, prefix, tokenSupport: toTokenAddress });
    return encodeResult.address;
  }

  // Each address is from a node of a wallet path
  getNodeDetails(path) {
    const node = this.getNodeAt(path);

    const privkeyWif = encodePrivateKeyWif(node.privateKey, 'mainnet');
    const pubkeyBuffer = deriveHdPublicNode(node).publicKey;
    const pubkey = binToHex(pubkeyBuffer);

    const address = this.pubkeyToAddress({ publicKey: pubkeyBuffer, network: 'mainnet', toTokenAddress: false })
    const tokenAddress = this.pubkeyToAddress({ publicKey: pubkeyBuffer, network: 'mainnet', toTokenAddress: true })

    const testnetAddress = this.pubkeyToAddress({ publicKey: pubkeyBuffer, network: 'chipnet', toTokenAddress: false })
    const testnetTokenAddress = this.pubkeyToAddress({ publicKey: pubkeyBuffer, network: 'chipnet', toTokenAddress: true })

    const pkHashBuffer = hash160(pubkeyBuffer);
    const pkHash = binToHex(pkHashBuffer);
    const legacyAddress = encodeBase58Address("p2pkh", pkHashBuffer);

    return {
      testnetAddress,
      address,
      legacyAddress,
      tokenAddress,
      testnetTokenAddress,
      pkHash,
      pubkey,
      privkeyWif,
    }
  }

  generate (index=0) {
    return {
      receiving: this.getNodeDetails('0/' + index),
      change: this.getNodeDetails('1/' + index)
    }
  }

  // This is an example of sending bch to a single recipient
  async sendBch(recipient, amount) {
    // getting the wallet's address
    const walletData = this.generate();
    const address = walletData.receiving.address;

    // Fetching the tokens of the wallet
    const utxos = await getUtxos(address);

    // Must filter only the UTXOs
    const utxosWithoutToken = utxos.filter(utxo => !utxo.token);

    const provider = new ElectrumNetworkProvider('mainnet');
    const txBuilder = new TransactionBuilder({ provider });

    // Setting up a signer for the UTXOs
    const unlocker = new SignatureTemplate(walletData.receiving.privkeyWif);

    // Adding the UTXOs as inputs and output for the recipient
    txBuilder.addInputs(utxosWithoutToken, unlocker.unlockP2PKH());
    txBuilder.addOutput({
      to: recipient,
      amount: BigInt(amount),
    })


    // This is an example of how to determine the minimum transaction fee to that;
    // excess BCH from inputs are properly returned to the wallet as change
    const P2PKH_INPUT_SIZE = 141;
    const P2PKH_OUTPUT_SIZE = 34;
    const FEE_PER_BYTE = 1.1;

    const totalInputAmount = txBuilder.inputs.reduce((subtotal, utxo) => subtotal + utxo.satoshis, 0n)
    const totalOutputAmount = txBuilder.outputs.reduce((subtotal, output) => subtotal + output.amount, 0n)

    let transactionSize = getTxSizeWithoutInputs(txBuilder.outputs) + 34
    transactionSize += txBuilder.inputs.length * P2PKH_INPUT_SIZE;
    transactionSize += P2PKH_OUTPUT_SIZE; // for change output
    const totalFee = Math.ceil(transactionSize * FEE_PER_BYTE);
    const change = totalInputAmount - totalOutputAmount - BigInt(totalFee);

    const changeOutput = { to: address, amount: change };
    if (changeOutput.amount >= 546n) {
      txBuilder.addOutput(changeOutput);
    }

    const txDetails = await txBuilder.send();
    return txDetails;
  }

  // This is an example of sending fungible token to a single recipient
  // Category => Token ID
  async sendToken(recipient, category, amount) {
    const walletData = this.generate();
    const address = walletData.receiving.address;
    const tokenAddress = walletData.receiving.tokenAddress;
    const unlocker = new SignatureTemplate(walletData.receiving.privkeyWif);

    // Fetch UTXOs
    const utxos = await getUtxos(address);
    const utxosWithoutToken = utxos.filter(utxo => !utxo.token);
    const utxosWithFungibleToken = utxos.filter(utxo => utxo?.token?.category === category)

    // Initializing the provider and tx builder
    const provider = new ElectrumNetworkProvider('mainnet');
    const txBuilder = new TransactionBuilder({ provider });

    // Adding BCH only UTXOs to cover for transaction fees
    txBuilder.addInputs(utxosWithoutToken, unlocker.unlockP2PKH());

    // Adding the token UTXOs to cover for the required amount to send
    txBuilder.addInputs(utxosWithFungibleToken, unlocker.unlockP2PKH());

    // Adding the output for sending the token to recipient
    txBuilder.addOutput({
      to: recipient,
      amount: 1000n, // 1000 satoshis is the standard amount for a UTXO with tokens
      token: {
        category: category,
        amount: BigInt(amount),
      }
    })

    
    // Getting the excess token from inputs and returning to the wallet's address
    const totalTokenAmount = utxosWithFungibleToken.reduce((subtotal, utxo) => subtotal + utxo.token.amount, 0n)
    const changeTokenAmount = totalTokenAmount > BigInt(amount);
    if (changeTokenAmount) {
      txBuilder.addOutput({
        to: tokenAddress,
        amount: 1000n,
        token: {
          category: category,
          amount: BigInt(changeTokenAmount),
        }
      })
    }

    // This is an example of how to determine the minimum transaction fee to that;
    // excess BCH from inputs are properly returned to the wallet as change
    const P2PKH_INPUT_SIZE = 141;
    const P2PKH_OUTPUT_SIZE = 34;
    const FEE_PER_BYTE = 1.1;

    // Calculating the transaction size & fee
    let transactionSize = getTxSizeWithoutInputs(txBuilder.outputs);
    transactionSize += txBuilder.inputs.length * P2PKH_INPUT_SIZE;
    transactionSize += P2PKH_OUTPUT_SIZE; // for change output
    const totalFee = Math.ceil(transactionSize * FEE_PER_BYTE);


    // Calculating the change amount
    const totalInputAmount = txBuilder.inputs.reduce((subtotal, utxo) => subtotal + utxo.satoshis, 0n)
    const totalOutputAmount = txBuilder.outputs.reduce((subtotal, output) => subtotal + output.amount, 0n)
    const change = totalInputAmount - totalOutputAmount - BigInt(totalFee);

    const changeOutput = { to: address, amount: change };
    if (changeOutput.amount >= 546n) {
      txBuilder.addOutput(changeOutput);
    }

    const txDetails = await txBuilder.send();
    return txDetails;
  }

  // implement send nft
  async sendNft(recipient, category, capability, commitment) {
    const walletData = this.generate();
    const address = walletData.receiving.address;
    const unlocker = new SignatureTemplate(walletData.receiving.privkeyWif);

    // Fetch UTXOs
    const utxos = await getUtxos(address);
    const utxosWithoutToken = utxos.filter(utxo => !utxo.token);

    // Finding the actual NFT to send
    const nftUtxo = utxos.find(utxo => {
      if (!utxo.token || !utxo.token.nft) return

      return utxo.token.category === category &&
            utxo.token.nft.capability === capability &&
            utxo.token.nft.commitment === commitment
    })
    if (!nftUtxo) throw new Error('Missing NFT')

    // Initializing the provider and tx builder
    const provider = new ElectrumNetworkProvider('mainnet');
    const txBuilder = new TransactionBuilder({ provider });

    // Adding BCH only UTXOs to cover for transaction fees
    txBuilder.addInputs(utxosWithoutToken, unlocker.unlockP2PKH());

    // Adding the UTXO that has the NFT to send
    txBuilder.addInputs(nftUtxo, unlocker.unlockP2PKH());

    // Adding the output for sending the NFT to recipient
    txBuilder.addOutput({
      to: recipient,
      amount: nftUtxo.satoshis,
      token: nftUtxo.token,
    })

    const P2PKH_INPUT_SIZE = 141;
    const P2PKH_OUTPUT_SIZE = 34;
    const FEE_PER_BYTE = 1.1;

    // Calculating the transaction size & fee
    let transactionSize = getTxSizeWithoutInputs(txBuilder.outputs) + 34
    transactionSize += txBuilder.inputs.length * P2PKH_INPUT_SIZE;
    transactionSize += P2PKH_OUTPUT_SIZE; // for change output
    const totalFee = Math.ceil(transactionSize * FEE_PER_BYTE);

    // Calculating the change amount
    const totalInputAmount = txBuilder.inputs.reduce((subtotal, utxo) => subtotal + utxo.satoshis, 0n)
    const totalOutputAmount = txBuilder.outputs.reduce((subtotal, output) => subtotal + output.amount, 0n)
    const change = totalInputAmount - totalOutputAmount - BigInt(totalFee);

    const changeOutput = { to: address, amount: change };
    if (changeOutput.amount >= 546n) {
      txBuilder.addOutput(changeOutput);
    }

    const txDetails = await txBuilder.send();
    return txDetails;
  }
}
