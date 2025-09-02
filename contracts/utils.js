import BCHJS from "@psf/bch-js"
import { WalletGenerator } from "./wallet.js"


const bchjs = new BCHJS()


export const toBytes32 = (val, encoding = 'utf8', toString = false) => {
  let bytes32 = bchjs.Crypto.hash256(Buffer.from(val, encoding))
  if (toString) bytes32 = bytes32.toString('hex')
  return bytes32
}


export const generatePubkeyHashes = async () => {
    const mnemonic = 'random words for testing only'
    const wallets = [
        new WalletGenerator(mnemonic + '1'),
        new WalletGenerator(mnemonic + '2'),
        new WalletGenerator(mnemonic + '3'),
        new WalletGenerator(mnemonic + '4'),
        new WalletGenerator(mnemonic + '5'),
    ]
    const members = []
    for (const wallet of wallets) {
        const _wallet = await wallet.generate()
        // console.log(_wallet)
        members.push(_wallet.receiving.pkHash)
    }
    return members
}