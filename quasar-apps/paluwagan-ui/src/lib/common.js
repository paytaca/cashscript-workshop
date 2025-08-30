import { ElectrumNetworkProvider } from "cashscript";

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
