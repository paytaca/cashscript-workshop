import QRCode from 'qrcode'
import { Contract, ElectrumNetworkProvider } from "cashscript"
import { addressToPkhash } from "../lib/common.js"
// if with doesn't work, try assert
import PasswordVaultArtifact from './PasswordVault.json' with { type: 'json' }

