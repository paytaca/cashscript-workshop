import { Contract, ElectrumNetworkProvider } from "cashscript"
import { addressToPkhash } from "../lib/common.js"
import PasswordVaultArtifact from './PasswordVault.json' with { type: 'json' }

// set up network provider
const provider = new ElectrumNetworkProvider('mainnet')

// setup contract arguments based on contract parameters
const contractArgs = [
  // payout
  1234n, // do not replace
  // ownerPkhash
  addressToPkhash('address'), // replace address with your Paytaca wallet address
  // passcode
  '123456', // replace with your password or keep the default one
]

// instantiate contract
export const passwordVaultContract = new Contract(PasswordVaultArtifact, contractArgs, { provider })