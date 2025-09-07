import { decodeCashAddress } from "@bitauth/libauth";
import { ElectrumNetworkProvider } from "cashscript";

/**
 * Decodes the given BCH address to its equivalent public key hash.
 * @param {String} address the given BCH address
 * @returns the public key hash decoded from the address
 */
export function addressToPkhash(address) {
  const decoded = decodeCashAddress(address)
  if (typeof decoded === 'string') throw new Error(decoded);
  return decoded.payload
}

export async function getBalance(address) {
  const utxos = await getUtxos(address);
  let bchBalance = 0n;

  for (const utxo of utxos) {
    if (utxo.token) {
      continue
    }

    bchBalance += utxo.satoshis
  }

  return bchBalance
}

export async function getUtxos(address) {
  const provider = new ElectrumNetworkProvider("mainnet")
  return provider.getUtxos(address)
}

