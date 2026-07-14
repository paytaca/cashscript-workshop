import BCHJS from '@psf/bch-js'


const bchjs = new BCHJS()


export const toBytes20 = (val, encoding = 'hex', toString = true) => {
  let bytes20 = bchjs.Crypto.hash160(Buffer.from(val, encoding))
  if (toString) bytes20 = bytes20.toString('hex')
  return bytes20
}