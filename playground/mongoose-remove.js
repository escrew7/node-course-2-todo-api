const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
//   console.log(result)
// });

Todo.findByIdAndRemove('59ee65dde562ab12f94a9b6f').then((todo) => {
  console.log(todo)
})
