const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const logger = require('./util/logger')
const MongoClient = require('mongodb').MongoClient;

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

app.get('*', function(req,res){
  res.sendFile(path.resolve(__dirname, 'client', 'index.js'));
});

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
  if (req.body.email == 'test@uwaterloo.ca' && req.body.password == '12345678') {
    res.send('SUCCESS');
  } else {
    res.send('FAIL');
  }
});

app.post('/api/match_request', function(req, res){
  console.log("search criteria: "+req.body.term.term+' '+req.body.subject.subject+' '+req.body.number.number);
  var matchedUser = '1';
  MongoClient.connect(dbAddr, function(err, db) {
    if(err) throw err;
    var Users = db.db('user');
    var query = {course:{ 
      subject: `${req.body.subject}`, 
      catelog_number: `${req.body.number}`,}};
    console.log('query: '+query.course.term+' '+query.course.subject+' '+query.course.catelog_number);

    Users.collection('matching').find(query).toArray(function(err, dbres){
    if(err){console.log(err); throw err;}
    console.log("db return arry size: "+dbres.length);
    if(dbres.length < 1){
      res.send('unmatched');
    }else{
      console.log('Matched!');
      var randMatched = dbres[Math.floor(Math.random()*dbres.length)];
      console.log("Matched data: "+randMatched.name+" "+randMatched.email);
      res.send({name: `${randMatched.name}`, 
                email: `${randMatched.email}`,
    });
    }
    db.close();
    });
  });
});


app.listen(port, function(){
  console.log('Run on port '+port);
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

// app.listen(port, () => {
//   logger.debug(`Server listening on port ${port}`);
// });
