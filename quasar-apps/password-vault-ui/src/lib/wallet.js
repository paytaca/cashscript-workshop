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
import { getOutputSize, getTxSizeWithoutInputs } from "cashscript/dist/utils";
import { getUtxos } from "./common";


export class Wallet {
  constructor(mnemonic) {
    this.mnemonic = mnemonic
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

  getNodeDetails(path) {
    const node = this.getNodeAt(path);
    const privkey = encodePrivateKeyWif(node.privateKey, 'mainnet');
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
      privkey,
    }
  }

  generate (index=0) {
    return {
      receiving: this.getNodeDetails('0/' + index),
      change: this.getNodeDetails('1/' + index)
    }
  }

  // implement send bch
  async sendBch(recipient, amount) {
    const walletData = this.generate();
    const address = walletData.receiving.address;
    const unlocker = new SignatureTemplate(walletData.receiving.privkey);

    const utxos = await getUtxos(address);
    const utxosWithoutToken = utxos.filter(utxo => !utxo.token);

    const provider = new ElectrumNetworkProvider('mainnet');
    const txBuilder = new TransactionBuilder({ provider });
    txBuilder.addInputs(utxosWithoutToken, unlocker.unlockP2PKH());
    txBuilder.addOutput({
      to: recipient,
      amount: BigInt(amount),
    })

    const totalInputAmount = txBuilder.inputs.reduce((subtotal, utxo) => subtotal + utxo.satoshis, 0n)
    const totalOutputAmount = txBuilder.outputs.reduce((subtotal, output) => subtotal + output.amount, 0n)

    const P2PKH_INPUT_SIZE = 141;
    const P2PKH_OUTPUT_SIZE = 34;
    const FEE_PER_BYTE = 1.1;
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

  // implement send nft
  async sendNft(recipient, category, capability, commitment) {
    const walletData = this.generate();
    const address = walletData.receiving.address;
    const unlocker = new SignatureTemplate(walletData.receiving.privkey);

    const utxos = await getUtxos(address);
    const utxosWithoutToken = utxos.filter(utxo => !utxo.token);
    const nftUtxo = utxos.find(utxo => {
      if (!utxo.token || !utxo.token.nft) return

      return utxo.token.category === category &&
            utxo.token.nft.capability === capability &&
            utxo.token.nft.commitment === commitment
    })
    if (!nftUtxo) throw new Error('Missing NFT')

    const provider = new ElectrumNetworkProvider('mainnet');
    const txBuilder = new TransactionBuilder({ provider });
    txBuilder.addInputs(utxosWithoutToken, unlocker.unlockP2PKH());
    txBuilder.addInputs(nftUtxo, unlocker.unlockP2PKH());
    txBuilder.addOutput({
      to: recipient,
      amount: nftUtxo.satoshis,
      token: nftUtxo.token,
    })

    const totalInputAmount = txBuilder.inputs.reduce((subtotal, utxo) => subtotal + utxo.satoshis, 0n)
    const totalOutputAmount = txBuilder.outputs.reduce((subtotal, output) => subtotal + output.amount, 0n)

    const P2PKH_INPUT_SIZE = 141;
    const P2PKH_OUTPUT_SIZE = 34;
    const FEE_PER_BYTE = 1.1;
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
}