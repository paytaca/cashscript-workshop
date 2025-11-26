import { Contract, ElectrumNetworkProvider } from "cashscript";

import PasswordVaultArtifact from '../contracts/PasswordVault.json';
import { addressToPkhash, isValidWalletAddress } from "./common.js";

export function createPasswordVaultContract(payout, ownerAddress, passcode) {
  // set up network provider
  const provider = new ElectrumNetworkProvider("mainnet")

  // Validate the ownerAddress if it's a valid wallet address
  const validAddress = isValidWalletAddress(ownerAddress);
  if (!validAddress) {
    throw new Error(`Invalid owner address, must be a wallet address`)
  }

  // 20 bytes of zero
  let pkhash = '0000000000000000000000000000000000000000';

  if (ownerAddress) {
    pkhash = addressToPkhash(ownerAddress)
  }

  // setup contract arguments based on contract parameters
  const contractParameters = [
    BigInt(payout),
    pkhash,
    passcode,
  ]

  // instantiate contract
  return new Contract(PasswordVaultArtifact, contractParameters, { provider })
}
