var express = require('express')
var bodyParser = require('body-parser')

var {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo.js')
var {User} = require('./models/user.js')

var app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos', (req ,res) => {
  Todo.find().then((todos) => {
      res.send({todos});
  }, (e) => {
    res.status(400).send(e)
  })
})


// GET /todos/123123
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  //Valid id using isValid
    //404 - send back empty body

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })
  //findById
    //success
      //if todo -send back
      //if notodo - send back 404 with empty body
    //error
      //400 - with empty body
})

app.delete('/todos/:id', (req, res) => {
  //get id
  var id = req.params.id;
  //validate the id -> not valid? return 404
  if(!ObjectID.isValid(id)) {
    return res.status(404).send()
  };
  //remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    //success
      //if no doc. send 404
    if(!todo) {
      return res.status(404).send()
    }
    //if doc, send back with 200
    res.send({todo})
    //error
      //404 with empty body
  }).catch((e) => {
    res.status(400).send()
  })





})



app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

module.exports = {app};
