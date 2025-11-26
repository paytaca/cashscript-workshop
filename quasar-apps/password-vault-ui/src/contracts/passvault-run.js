import QRCode from 'qrcode'
import { Contract, ElectrumNetworkProvider, TransactionBuilder } from "cashscript"
import { electrum } from "../lib/electrum.js"
import { addressToPkhash } from "../lib/common.js"
// if 'with' doesn't work, try 'assert'
import PasswordVaultArtifact from "./PasswordVault.json" with { type: 'json' }


