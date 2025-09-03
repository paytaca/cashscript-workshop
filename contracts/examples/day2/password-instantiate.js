import { Contract, MockNetworkProvider } from "cashscript"
import PasswordArtifact from './password.json' with { type: 'json' }


// setup contract arguments based on contract parameters
const contractArgs = ['change_or_keep_password'] // change or keep password

// set up network provider
const provider = new MockNetworkProvider()

// instantiate contract
const contract = new Contract(PasswordArtifact, contractArgs, { provider })
