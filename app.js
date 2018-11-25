const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const logger = require('./util/logger')
const MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');

const dbAddr = 'mongodb://admin:0000@meetuw-shard-00-00-5sqfz.mongodb.net:27017,meetuw-shard-00-01-5sqfz.mongodb.net:27017,meetuw-shard-00-02-5sqfz.mongodb.net:27017/test?ssl=true&replicaSet=meetuw-shard-0&authSource=admin';

MongoClient.connect(dbAddr, function(err, db) {
  if(!err) {
    console.log("We are connected to DB");
  }
  var Users = db.db('user');
  Users.collection('matching').findOne({}, function(err, res){
    if(err) throw err;
    console.log("first username: "+res.name);
    db.close();
  })
});

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const staticFiles = express.static(path.join(__dirname, './client/build'));
app.use(staticFiles);

app.use(require('./middlewares/serveClient'));

app.get('/test', (req, res) => {
  res.send('TEST');
});

app.get('/', (req, res) => {
  res.send('CONNECTED');
});

app.post('/testpost', (req, res) => {
  console.log(req.body);
  res.send({ program: `${req.body.program}`, category: `${req.body.category}` });
});

app.post('/api/login', (req, res) => {
  console.log(req.body);

  //find user on db
  MongoClient.connect(dbAddr, function(err, db) {
    if(err) throw err;
    var Users = db.db('user');
    var thisToken = md5(req.body.password);
    var query = {email:`${req.body.email}`, token:`${thisToken}`};
    console.log('query: '+query.email+' '+query.token);

    Users.collection('auth').findOne(query, function(err, dbres){
    if(err){console.log(err); throw err;}
    console.log("db return  "+dbres);
    if(dbres == null){
      res.send('FAIL');
    }else{
      res.send('SUCCESS');
      console.log('send success');
    }
    db.close();
    });
  });
});

app.post('/api/match_request', function(req, res){
  console.log("search criteria: "+req.body.term+' '+req.body.subject+' '+req.body.number);
  var matchedUser = '';
  MongoClient.connect(dbAddr, function(err, db) {
    if(err) throw err;
    var Users = db.db('user');
    var query = {course:{term: '1189',
      subject: `${req.body.subject}`,
      catelog_number: `${req.body.number}`,}};
    console.log('query: '+query.course.subject+' '+query.course.catelog_number);

    Users.collection('matching').find(query).toArray(function(err, dbres){
    if(err){console.log(err); throw err;}
    console.log("db return arry size: "+dbres.length);
    if(dbres.length < 1){
      res.send('unmatched');
    }else{
      console.log('Matched!');
      var randMatched = dbres[Math.floor(Math.random()*dbres.length)];
      console.log("Matched data: "+randMatched.name+" "+randMatched.email);
      var data = {name: `${randMatched.name}`, email: `${randMatched.email}`,};
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
    }
    db.close();
    });
  });
});

// function ValidateEmail(mail) 
// {
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
//   {
//     return (true)
//   }
//     alert("You have entered an invalid email address!")
//     return (false)
// }


app.post('/api/register', function(req, res){
  console.log("register called");

  //email verification
  var email = req.body.email;
  // if(ValidateEmail(email) == false){
  //   res.status(400).send("invalid email");
  // }
  //encrypt password
  var token = md5(req.body.password);

  //insert to db
  MongoClient.connect(dbAddr, function(err, db){
    if(err) throw err;
    var dbo = db.db("user");
    var userObj = {email: `${req.body.email}`, token: `${token}`};
    console.log("userObj: "+userObj);

    dbo.collection("auth").insertOne(userObj, function(err, res){
      if(err) throw err;
      console.log("user data inserted");
      db.close();
    })
  });
  res.status(200).send();
})


app.listen(port, function(){
  console.log('Run on port '+port);
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

// app.listen(port, () => {
//   logger.debug(`Server listening on port ${port}`);
// });
