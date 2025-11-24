# Cashscript UI Exercise

An exercise for UI & javascript integration for Cashscript Development.
Create a User interface that interacts with a cashscript smart contract below:
```
// src/contracts/Contract.cash

pragma cashscript ^0.12.0;

contract PasswordHash(int seed) {
    function spend(int password) {
        int hash = password + seed;
        require(hash == 99999);
    }
}
```

Your task is to integrate the following features in the contract:
1. Create the contract instance:
    a. Create an input field for the smart contract's parameter
    b. Create a button that will create the contract instance using the value in the input field from above as the contract parameter
    c. (Optional) Use lifecycle hook to automatically provide a value for the input & create the contract instance
2. Display the contract instance's details:
    a. Display the contract's address
    b. Display the contract address in QR Code
    c. (Optional) Display the balance in terms of satoshis or BCH

3. Create a form that will spend from the smart contract's funds
    a. Provide a form field for the recipient address & function parameter for unlocking
    b. Provide a button that will create and send the transaction for spending from the smart contract.
    c. Display a button that will redirect to an explorer:
        - If using mainnet: `https://explorer.bch.ninja/tx/` + `{txid}`
        - If using chipnet: `https://chipnet.bch.ninja/tx/` + `{txid}`


## Useful links:
- VueJS Docs: https://vuejs.org/guide/introduction.html
- VueJS Tutorial: https://vuejs.org/tutorial/#step-1
- Quasar components - https://quasar.dev/components
- QR code - https://www.npmjs.com/package/qrcode#es6es7
- Creating contract instance - https://cashscript.org/docs/sdk/instantiation
- Building Transactions - https://cashscript.org/docs/sdk/transaction-builder
