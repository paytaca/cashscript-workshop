
// This code is generated from ChatGPT using this prompt:
/*
  Create a code for encrypting and decrypting string using a passphrase, use vanilla javascript.
  Make sure the encrypt and decrypt function returns a single string only
*/

// Encryption is useful for storing mnemonic in the devices securely using a password
// by encrypting them with a password before saving the mnemonic; then
// decrypt them with the password before when using


// Convert ArrayBuffer to string
function arrayBufferToString(buffer) {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

// Derive key from passphrase using PBKDF2
async function deriveKey(passphrase) {
  const enc = new TextEncoder();
  const passphraseBuffer = enc.encode(passphrase);
  
  // Using PBKDF2 to derive key
  return await crypto.subtle.importKey(
    "raw", 
    passphraseBuffer, 
    { name: "PBKDF2" }, 
    false, 
    ["deriveKey"]
  ).then(baseKey => {
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new Uint8Array(16), // Static "salt"
        iterations: 100000,
        hash: "SHA-256"
      },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  });
}

// Encrypt a string using AES-GCM
export async function encryptString(plainText, passphrase) {
  const key = await deriveKey(passphrase);
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  // Using static 12-byte nonce (no randomness)
  const nonce = new Uint8Array(12);

  // Encrypt the data
  const cipherTextBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: nonce
    },
    key,
    data
  );

  const cipherText = new Uint8Array(cipherTextBuffer);
  
  // Combine nonce and encrypted data into a single string (Base64)
  const combined = new Uint8Array(nonce.length + cipherText.length);
  combined.set(nonce, 0);
  combined.set(cipherText, nonce.length);
  
  return btoa(String.fromCharCode.apply(null, combined));  // Base64-encoded result
}

// Decrypt a string using AES-GCM
export async function decryptString(encryptedText, passphrase) {
  const combined = new Uint8Array(atob(encryptedText).split("").map(c => c.charCodeAt(0)));
  const nonce = combined.slice(0, 12);  // First 12 bytes are the nonce
  const cipherText = combined.slice(12);  // Remaining bytes are the cipher text
  
  const key = await deriveKey(passphrase);

  // Decrypt the data
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: nonce
    },
    key,
    cipherText
  );

  return arrayBufferToString(decryptedBuffer);
}
