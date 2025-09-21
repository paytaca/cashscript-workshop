import { SignatureTemplate, TransactionBuilder } from "cashscript";
import { createPasswordVaultContract } from "./contract-instantiate.js";


// This function uses the contract's 'ownerUnlock' function to
// send all of the contract's balance to the recipientAddress
export async function sweepContractFunds(parameters, ownerWif, recipientAddress) {
  // Instantiate the contract using parameters object
  const contract = createPasswordVaultContract(parameters.payout, parameters.ownerAddress, parameters.passcode)

  // Create a signer from ownerWif (private key)
  const signer = new SignatureTemplate(ownerWif);

  // Create unlocker, the first parameter is a SignatureTemplate used for generating the sig data type
  const unlocker = contract.unlock.ownerUnlock(signer, signer.getPublicKey());

  // Get the UTXOs of the contract
  const utxos = await contract.getUtxos()
  
  // instantiate Transaction Builder
  const transactionBuilder = new TransactionBuilder({ provider: contract.provider })
  transactionBuilder.addInputs(utxos, unlocker);

  // Get the total satoshis of contract
  let amountReceived = 0n; // or BigInt(0)
  for(var i = 0; i < utxos.length; i++) {
    amountReceived += utxos[i].satoshis;
  }

  // Send all satoshis to recipient, minus the transaction fee
  const FIXED_TX_FEE = 500n;
  transactionBuilder.addOutput({
    to: recipientAddress,
    amount: amountReceived - FIXED_TX_FEE, 
  })

  // Sending the transaction to blockchain network
  const result = transactionBuilder.send();

  // Returning the result of the transaction
  return result;
}
