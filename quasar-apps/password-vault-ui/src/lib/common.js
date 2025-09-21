import { binToHex, decodeCashAddress, decodeTransactionBCH, encodeCashAddress, encodeLockingBytecodeP2pkh, encodeLockingBytecodeP2sh20, encodeLockingBytecodeP2sh32, hexToBin, lockingBytecodeToAddressContents } from "@bitauth/libauth";
import { ElectrumNetworkProvider } from "cashscript";

/**
 * Decodes the given BCH address to its equivalent public key hash.
 * @param {String} address the given BCH address
 * @returns the public key hash decoded from the address
 */
export function addressToPkhash(address) {
  const decoded = decodeCashAddress(address)
  if (typeof decoded === 'string') throw new Error(decoded);
  return decoded.payload
}


/**
 * Returns the amount of satoshis a given address has.
 */
export async function getBalance(address) {
  const utxos = await getUtxos(address);
  let bchBalance = 0n;

  for (const utxo of utxos) {
    if (utxo.token) {
      continue
    }

    bchBalance += utxo.satoshis
  }

  return bchBalance
}

/**
 * Returns all the Unspent Transaction Outputs (UTXOs) for a given address.
 */
export async function getUtxos(address) {
  const provider = new ElectrumNetworkProvider("mainnet")
  return provider.getUtxos(address)
}


/**
 * Returns true if the given address is a valid BCH address, false otherwise.
 */
export function isValidAddress(address) {
  const decoded = decodeCashAddress(address)
  if (typeof decoded === 'string') {
    return false;
  }

  return true;
}

export function isValidWalletAddress(address) {
  const decoded = decodeCashAddress(address)
  if (typeof decoded === 'string') {
    return false;
  }

  return decoded.type === 'p2pkh';
}


/**
 * Decodes a raw transaction in hex format to a JSON object.
 */
export function decodeTransaction(transactionHex) {
  const transactionBinary = hexToBin(transactionHex);
  const decodedTransaction = decodeTransactionBCH(transactionBinary);
  if (typeof decodedTransaction === 'string') {
    throw new Error(decodedTransaction);
  }

  const inputs = decodedTransaction.inputs.map((input) => {
    return {
      txid: binToHex(input.outpointTransactionHash),
      vout: input.outpointIndex,
      sequence: input.sequenceNumber,
      scriptSig: binToHex(input.unlockingBytecode),
    }
  })

  const outputs = decodedTransaction.outputs.map(output => {
    return {
      address: lockingBytecodeToAddress(output.lockingBytecode),
      satoshis: output.valueSatoshis,
      token: output.token,
    }
  })

  const transaction = {};
  transaction.inputs = inputs;
  transaction.outputs = outputs;
  transaction.version = decodedTransaction.version;
  transaction.locktime = decodedTransaction.locktime;
  return transaction;
}


/**
 * Converts a locking bytecode to an address.
 */
export function lockingBytecodeToAddress(lockingBytecode) {
  const addressContents = lockingBytecodeToAddressContents(lockingBytecode);
  const encodeResult = encodeCashAddress(addressContents);
  return encodeResult.address;
}


/**
 * Converts a BCH address to its equivalent locking bytecode in Uint8Array.
 */
export function addressToLockingBytecode(address) {
  const addressContents = decodeCashAddress(address);
  if (typeof addressContents === 'string') {
    throw new Error(addressContents);
  }

  const type = addressContents.type;
  const payload = addressContents.payload;
  const isP2PKH = (type === 'p2pkh' || type === 'p2pkhWithTokens');
  const isP2SH = (type === 'p2sh' || type === 'p2shWithTokens');

  if (isP2PKH) {
    return encodeLockingBytecodeP2pkh(payload);
  } else if (isP2SH) {
    if (payload.byteLength === 20) {
      return encodeLockingBytecodeP2sh20(payload);
    } else if (payload.byteLength === 32) {
      return encodeLockingBytecodeP2sh32(payload);
    }
  }

  throw new Error('Unsupported address type');
}
