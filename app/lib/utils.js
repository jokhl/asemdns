const Crypto = require('crypto')

exports.getRandom = function(bytesLength) {
  return Crypto.randomBytes(bytesLength).toString('base64')
}

exports.encrypt = function(string, salt) {
  let keylen = 64
  return Crypto.scryptSync(string, salt, keylen).toString('hex')
}