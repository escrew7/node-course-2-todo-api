const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')

var data = {
  id: 3
}

var token = jwt.sign(data, '123abc')

console.log(token)

var decoded = jwt.verify(token, '123abc')

console.log(decoded)
// var msg = 'I am user #3'
// var hash = SHA256(msg)
//
// console.log(`Message: ${msg}`)
// console.log(`Hash: ${hash}`)
//
//
// var data = {
//   id: 4
// }
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
//
// if(resultHash === token.hash) {
//   console.log('Data verified')
// } else {
//   console.log('Data corrupted')
// }
