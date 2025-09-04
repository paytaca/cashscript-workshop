import { Contract, MockNetworkProvider } from "cashscript"
import FaucetArtifact from './Faucet.json' with { type: 'json' }

// set up network provider
const provider = new MockNetworkProvider()

// setup contract arguments based on contract parameters
const contractArgs = [
  100n, // payout
  'bitcoincash:qze93uuw8vt8v358f7eupg3t4jtkpz8ltguhg62pde', // ownerPkhash
  '123456', // passcode
]

// instantiate contract
const contract = new Contract(FaucetArtifact, contractArgs, { provider })

console.log(contract)