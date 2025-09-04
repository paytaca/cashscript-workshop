import { decodeCashAddress } from "@bitauth/libauth";
import { ElectrumNetworkProvider } from "cashscript";

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
  const provider = new ElectrumNetworkProvider("chipnet")
  return provider.getUtxos(address)
}

