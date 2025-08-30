import BCHJS from '@psf/bch-js'
import bitcore from 'bitcore-lib'

import {
  decodeCashAddress,
  encodeCashAddress,
  CashAddressType,
  CashAddressNetworkPrefix,
} from '@bitauth/libauth'


const bchjs = new BCHJS()


export class WalletGenerator {

    constructor (mnemonic) {
        this.mnemonic = mnemonic
        this.derivationPath = "m/44'/145'/0'"
    }


    convertAddress ({ address, toTokenAddress = true, isLegacy = false }) {
        if (isLegacy) {
            try {
                address = bchjs.Address.toCashAddress(address)
            } catch {
                return address
            }
        }
        
        const isTestnet = address.split(':')[0].indexOf('test') >= 0
        const prefix = isTestnet ? CashAddressNetworkPrefix.testnet : CashAddressNetworkPrefix.mainnet
        const decodedAddr = decodeCashAddress(address);
        let type = CashAddressType.p2pkh;

        if (toTokenAddress) {
            switch (decodedAddr.type) {
                case CashAddressType.p2pkh:
                    type = CashAddressType.p2pkhWithTokens;
                    break;
                case CashAddressType.p2sh:
                    type = CashAddressType.p2shWithTokens;
                    break;
                case CashAddressType.p2pkhWithTokens:
                    return address
                case CashAddressType.p2shWithTokens:
                    return address
            }
        } else {
            switch (decodedAddr.type) {
                case CashAddressType.p2pkh:
                    return address
                case CashAddressType.p2sh:
                    return address
                case CashAddressType.p2pkhWithTokens:
                    type = CashAddressType.p2pkh
                    break
                case CashAddressType.p2shWithTokens:
                    type = CashAddressType.p2sh
                    break
            }
        }
        const encodedAddress = encodeCashAddress({ prefix, type, payload: decodedAddr.payload })
        return encodedAddress.address
    }


    async _getMasterHDNode () {
        const seedBuffer = await bchjs.Mnemonic.toSeed(this.mnemonic)
        const masterHDNode = bchjs.HDNode.fromSeed(seedBuffer)
        return masterHDNode
    }


    async _getChildNode () {
        const masterHDNode = await this._getMasterHDNode()
        return masterHDNode.derivePath(this.derivationPath)
    }


    async generate (index=0) {
        const network = bitcore.Networks.testnet

        const childNode = await this._getChildNode()
        const receivingAddressNode = childNode.derivePath('0/' + index)
        const changeAddressNode = childNode.derivePath('1/' + index)

        const receivingAddress = bchjs.HDNode.toCashAddress(receivingAddressNode)
        const changeAddress = bchjs.HDNode.toCashAddress(changeAddressNode)

        const receivingPubkey = bchjs.HDNode.toPublicKey(receivingAddressNode).toString('hex')
        const changePubkey = bchjs.HDNode.toPublicKey(changeAddressNode).toString('hex')

        const receivingPrivkey = bchjs.HDNode.toWIF(receivingAddressNode).toString('hex')
        const changePrivkey = bchjs.HDNode.toWIF(changeAddressNode).toString('hex')

        const receivingTestnetAddress = new bitcore.Address(
            new bitcore.PublicKey(receivingPubkey),
            network,
        ).toString();

        const changeTestnetAddress = new bitcore.Address(
            new bitcore.PublicKey(changePubkey),
            network,
        ).toString();

        return {
            receiving: {
                testnetAddress: bchjs.Address.toCashAddress(receivingTestnetAddress),
                address: receivingAddress,
                legacyAddress: bchjs.Address.toLegacyAddress(receivingAddress),
                tokenAddress: this.convertAddress({ address: receivingAddress }),
                testnetTokenAddress: this.convertAddress({ address: receivingTestnetAddress, isLegacy: true }),
                pkHash: bchjs.Crypto.hash160(Buffer.from(receivingPubkey, 'hex')).toString('hex'),
                pubkey: receivingPubkey,
                privkey: receivingPrivkey,
            },
            change: {
                testnetAddress: bchjs.Address.toCashAddress(changeTestnetAddress),
                address: changeAddress,
                legacyAddress: bchjs.Address.toLegacyAddress(changeAddress),
                tokenAddress: this.convertAddress({ address: changeAddress }),
                testnetTokenAddress: this.convertAddress({ address: changeTestnetAddress, isLegacy: true }),
                pkHash: bchjs.Crypto.hash160(Buffer.from(changePubkey, 'hex')).toString('hex'),
                pubkey: changePubkey,
                privkey: changePrivkey,
            }
        }
    }

}