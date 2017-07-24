const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('597475a5963de7a2c8453ad9')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('596e8d1655507f176c3bb320')
  },{
    $set: {
      name: 'Doc'
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  })
  // db.close();
})
