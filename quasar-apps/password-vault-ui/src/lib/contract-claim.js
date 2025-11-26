import { TransactionBuilder } from "cashscript";
import { createPasswordVaultContract } from "./contract-instantiate.js";

// This function uses the contract's `claim` function
// Like how a BCH faucet works
export async function claimPasswordVault(parameters, recipientAddress, passcode) {
  // Instantiate the contract using parameters object
  const contract = createPasswordVaultContract(parameters.payout, parameters.ownerAddress, parameters.passcode)

  // instantiate Transaction Builder
  const transactionBuilder = new TransactionBuilder({ provider: contract.provider })

  // Declare the send amount and transaction fee
  const toSendAmount = BigInt(parameters.payout);
  const TX_FEE = BigInt(300);

  // Get the UTXOs of the contract
  const utxos = await contract.getUtxos()

  // Find a suitable UTXO to use, satoshis that is greater than toSendAmount plus transaction fee
  let utxo;
  for(var i = 0; i < utxos.length; i++) {
    if (utxos[i].satoshis >= toSendAmount + TX_FEE) {
      utxo = utxos[i];
      break
    }
  }

  // Throw an error if no suitable UTXO is found
  if (utxo == undefined || utxo == null) {
    throw new Error('Not enough balance from vault')
  }

  // add input and output/s
  transactionBuilder.addInput(utxo, contract.unlock.claim(passcode))
  transactionBuilder.addOutput({ to: recipientAddress, amount: toSendAmount })

  // Calculate remaining satoshis after sending the payout and transaction fee
  // And add a change output if remaining satoshis is greater than required satoshis (546 satoshis)
  const changeAmount = utxo.satoshis - toSendAmount - 300n
  if (changeAmount > 546n) {
    transactionBuilder.addOutput({ to: contract.address, amount: changeAmount })
  }

  // Sending the transaction to blockchain network
  const result = transactionBuilder.send();

  // Returning the result of the transaction
  return result;
}
