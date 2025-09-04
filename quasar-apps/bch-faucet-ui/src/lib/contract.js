import { Contract, ElectrumNetworkProvider } from "cashscript";

import FaucetContractArtifact from '../contracts/Faucet.json';
import { addressToPkhash } from "./common.js";

export function createContractInstance(payoutAmount, ownerAddress, passcode) {
  const provider = new ElectrumNetworkProvider("chipnet")

  const contractParameters = [
    BigInt(payoutAmount),
    addressToPkhash(ownerAddress),
    passcode,
  ]

  return new Contract(FaucetContractArtifact, contractParameters, { provider })
}
