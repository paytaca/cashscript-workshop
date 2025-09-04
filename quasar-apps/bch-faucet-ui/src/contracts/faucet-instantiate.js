import { Contract, MockNetworkProvider } from "cashscript"
import { addressToPkhash } from "../lib/common.js"
import FaucetArtifact from './Faucet.json' with { type: 'json' }

// set up network provider
const provider = new MockNetworkProvider()

// setup contract arguments based on contract parameters
const contractArgs = [
  /* payout      */ 1234n,
  /* ownerPkhash */ addressToPkhash('bitcoincash:qze93uuw8vt8v358f7eupg3t4jtkpz8ltguhg62pde'),
  /* passcode    */ '123456',
]

// instantiate contract
export const faucetContract = new Contract(FaucetArtifact, contractArgs, { provider })