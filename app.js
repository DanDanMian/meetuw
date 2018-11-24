var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
const path = require('path');

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

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const staticFiles = express.static(path.join(__dirname, './client/build'));
app.use(staticFiles);


app.get('/test', function(req, res){
  res.send('TEST');
});

app.get('/', function(req, res){
  res.send('CONNECTED');
});

app.post('/testpost', function(req, res){
  console.log(req.body);
	res.send({program: `${req.body.program}`, category: `${req.body.category}`});
});

app.post('/api/login', function(req, res){
  console.log(req.body);
  if(req.body.email == 'test@uwaterloo.ca' && req.body.password == '12345'){
    res.send('login successful');
  }
  else{
    res.send('Wrong Email or Password!');
  }
});

app.post('/api/match_request', function(req, res){
  console.log("search criteria: "+req.body.term+' '+req.body.subject+' '+req.body.number);
  var matchedUser = '1';
  MongoClient.connect(dbAddr, function(err, db) {
    if(err) throw err;
    var Users = db.db('user');
    var query = {course:{term: `${req.body.term}`, 
      subject: `${req.body.subject}`, 
      catelog_number: `${req.body.number}`,}};
    console.log('query: '+query.course.term+' '+query.course.subject+' '+query.course.catelog_number);

    Users.collection('matching').find(query).toArray(function(err, dbres){
    if(err){console.log(err); throw err;}
    console.log("db return arry: "+dbres);
    if(dbres.length < 1){
      res.send('no match');
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


app.get('*', staticFiles);


app.listen(port, function(){
  console.log('Run on port '+port);
  console.log(`Server running at http://127.0.0.1:${port}/`);
});



