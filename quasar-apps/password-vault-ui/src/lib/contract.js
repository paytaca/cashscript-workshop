import { Contract, ElectrumNetworkProvider, SignatureTemplate, TransactionBuilder } from "cashscript";

import PasswordVaultArtifact from '../contracts/PasswordVault.json';
import { addressToPkhash } from "./common.js";

export function createContractInstance(payoutAmount, ownerAddress, passcode) {
  const provider = new ElectrumNetworkProvider("mainnet")

  const contractParameters = [
    BigInt(payoutAmount),
    addressToPkhash(ownerAddress),
    passcode,
  ]

  return new Contract(PasswordVaultArtifact, contractParameters, { provider })
}


export async function claimVault(parameters, recipientAddress, passcode) {
  const contract = createContractInstance(parameters.payoutAmount, parameters.ownerAddress, parameters.passcode)

  const payoutAmount = BigInt(parameters.payoutAmount);
  const TX_FEE = BigInt(300);

  const utxos = await contract.getUtxos()
  let utxo;
  for(var i = 0; i < utxos.length; i++) {
    if (utxos[i].satoshis > payoutAmount + TX_FEE) {
      utxo = utxos[i];
      break
    }
  }

  if (utxo == undefined || utxo == null) {
    return 'Not enough balance from vault'
  }

  const transactionBuilder = new TransactionBuilder({ provider: contract.provider })
  transactionBuilder.addInput(utxo, contract.unlock.claim(passcode))
  transactionBuilder.addOutput({
    to: recipientAddress, amount: payoutAmount
  })

  const remainingSatoshis = utxo.satoshis - payoutAmount - TX_FEE
  if (remainingSatoshis > 546n) {
    transactionBuilder.addOutput({
      to: contract.address, amount: remainingSatoshis,
    })
  }

  const result = transactionBuilder.send();
  return result;
}


export async function sweepFunds(parameters, ownerWif, recipientAddress) {
  const contract = createContractInstance(parameters.payoutAmount, parameters.ownerAddress, parameters.passcode)

  const signer = new SignatureTemplate(ownerWif);
  const unlocker = contract.unlock.ownerUnlock(signer, signer.getPublicKey());

  const utxos = await contract.getUtxos()
  
  const transactionBuilder = new TransactionBuilder({ provider: contract.provider })
  transactionBuilder.addInputs(utxos, unlocker);

  let amountReceived = 0n; // or BigInt(0)
  for(var i = 0; i < utxos.length; i++) {
    amountReceived += utxos[i].satoshis;
  }

  const FIXED_TX_FEE = 500n;
  amountReceived -= FIXED_TX_FEE;
  transactionBuilder.addOutput({ to: recipientAddress, amount: amountReceived })

  const result = transactionBuilder.send();
  return result;
}
