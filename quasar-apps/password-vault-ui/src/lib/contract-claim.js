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
    if (utxos[i].satoshis > toSendAmount + TX_FEE) {
      utxo = utxos[i];
      break
    }
  }

  // Throw an error if no suitable UTXO is found
  if (utxo == undefined || utxo == null) {
    throw new Error('Not enough balance from vault')
  }

  // Declare the outputs array
  const outputs = [
    {
        to: recipientAddress,
        amount: toSendAmount,
    }
  ]

  // Calculate remaining satoshis after sending the payout and transaction fee
  const changeAmount = utxo.satoshis - toSendAmount - 300n

  // Add a change output if remaining satoshis is greater than required satoshis (546 satoshis)
  if (changeAmount > 546n) {
    outputs.push({
      to: contract.address,
      amount: changeAmount,
    })
  }


  // build the transaction (add input and output/s)
  transactionBuilder.addInput(utxo, contract.unlock.claim(passcode))
  transactionBuilder.addOutput()


  // Sending the transaction to blockchain network
  const result = transactionBuilder.send();

  // Returning the result of the transaction
  return result;
}
