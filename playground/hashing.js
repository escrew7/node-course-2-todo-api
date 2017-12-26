const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var password = '123abc'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash)
  })
})

var hashedPassword = '$2a$10$.paWLOJ21c89Ihv5h7SYl.QtFMFD4e2Tz./H/8QKoJLwIg2dKF/.W'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res)
})

// var data = {
//   id: 3
// }
//
// var token = jwt.sign(data, '123abc')
//
// console.log(token)
//
// var decoded = jwt.verify(token, '123abc')
//
// console.log(decoded)
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
