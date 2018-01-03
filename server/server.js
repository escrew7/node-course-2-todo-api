require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo.js')
var {User} = require('./models/user.js')
var {authenticate} = require('./middlewear/authenticate')

var app = express()
const port = process.env.PORT;

app.use(bodyParser.json())

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos', authenticate,  (req ,res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
      res.send({todos});
  }, (e) => {
    res.status(400).send(e)
  })
})


// GET /todos/123123
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  //Valid id using isValid
    //404 - send back empty body

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {
  //get id
  var id = req.params.id;
  //validate the id -> not valid? return 404
  if(!ObjectID.isValid(id)) {
    return res.status(404).send()
  };
  //remove todo by id
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

//Post / users

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch ((e) => {
    res.status(400).send(e)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

//POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body,['email', 'password'])

  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user)
      })
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})



app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

module.exports = {app};
