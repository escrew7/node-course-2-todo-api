const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //Delete One
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result)
  // })
  //
  //Delete Many
  // db.collection('Todos').deleteOne{text: 'Eat Lunch'}).then((result) => {
  //   console.log(result)
  // })

  //Find one and delete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })


  // db.collection('Users').deleteMany({name: 'Luke'}).then((result) => {
  //   console.log(result)
  // })

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5975252c963de7a2c84541d3')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2))
  })

    // db.close();
})
