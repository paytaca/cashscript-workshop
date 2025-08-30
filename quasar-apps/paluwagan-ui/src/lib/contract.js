import { compileFile } from "cashc";
import { Contract, ElectrumNetworkProvider } from "cashscript";

export function compileContract(members, potAmount, period) {
  const artifact = compileFile("../contracts/Paluwagan.cash")
  const provider = new ElectrumNetworkProvider("chipnet")

  const contractParameters = [
    ...members,
    potAmount,
    period
  ]

  return new Contract(artifact, contractParameters, { provider })
}
