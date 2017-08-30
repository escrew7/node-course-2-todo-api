const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// var id = '599f5839048a1b586029c773';
//
// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }
//
// // Todo.find({
// //   _id: id
// // }).then((todos) => {
// //   console.log('Todos', todos)
// // })
// //
// // Todo.findOne({
// //   _id: id
// // }).then((todo) => {
// //   console.log('Todo', todo)
// // })
//
// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found')
//   }
//   console.log('Todo by id', todo)
// })


var id = '597f0c88c7bfdd4c2aba5260'
var id2 = '597f0c88c7bfdd4c2aba5261'
var id3 = '597f0c88c7bfdd4c2aba52611'

User.findById(id).then((user) => {
  if(!user) {
    return console.log('user not found')
  }
  console.log('user', user)
}, (e) => {
  console.log(e)
})
