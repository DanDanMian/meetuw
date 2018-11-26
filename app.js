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

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

app.post('/api/match_request', function(req, res){
  console.log("search criteria: "+req.body.name+' '+req.body.email+' '+req.body.term+' '+req.body.subject+' '+req.body.number);
  var matchedUser = '';
  var termNum;
  var termScore = '0';

  //translate term string to term number
  if(req.body.term == 'Fall'){ 
    termNum = 1189; 
    termScore = 1
  }
  else if(req.body.term == 'Winter'){ 
    termNum = 1191;
    termScore = 2;
  }
  else {
    termNum = 1195;
    termScore = 3;
  }
  var subjectHash = req.body.subject.hashCode();
  console.log('subjectHash: '+subjectHash);
  var totalScore = subjectHash*10000+req.body.number*10+termScore;
  console.log('totalScore: '+totalScore);
  var dbResult;
  //fill in name
  // if(req.body.name == ''){
  //   req.body.name = req.body.email;
  //   console.log("fill in name as : "+req.body.name);
  // }
  var userObj = 
    { name: `${req.body.name}`, 
      email: `${req.body.email}`,
      course: { term: `${req.body.term}`,
                subject: `${req.body.subject}`,
                catelog_number: `${req.body.number}`,
              },
      score: `${totalScore}`,
   };
   console.log("userObj: "+JSON.stringify(userObj));

  

  MongoClient.connect(dbAddr, function(err, db) {
    if(err) throw err;
    var Users = db.db('user');

    //add user input to db
    Users.collection("matching").findOne(userObj, function(err, res){
      if(err) throw err;
      if(res == null){
        Users.collection("matching").insert(userObj, function(err,res){
          if(err) throw err;
          console.log("user match data inserted");
        })
      }
    });

    //find match
    var lb, ub;
    if(termScore == 1){
      lb = 0; ub = 2;
    }
    else if(termScore == 2){
      lb = 1; ub = 1
    }
    else{
      lb = 2; ub = 0;
    }
    var query = {score: {$gte: totalScore - ub, $lte: totalScore + lb},};
    console.log('query: '+JSON.stringify(query));

    Users.collection('matching').find(query).toArray(function(err, dbres){
      if(err){console.log(err); throw err;}
      
      //send result back
      console.log("db return arry size: "+dbres.length);
      dbResult = dbres;
      if(dbres.length < 1){
        console.log('unmatched!');
        res.send('unmatched');
      }else{
        dbres.sort(sortMatched);
        var noSelfRes = dbres.filter(function(el){
          return el.email != req.body.email;
        });
        var highestScore = noSelfRes[0].score;
        var highestScroeRes = noSelfRes.filter(function(el){
          return el.score == highestScore;
        });
        var randMatched = highestScroeRes[Math.floor(Math.random()*highestScroeRes.length)];
        console.log("Matched data: "+randMatched.name+" "+randMatched.email);
        var data = {name: `${randMatched.name}`, email: `${randMatched.email}`,};
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(data));
      }
      db.close();
    });
  });
});

function sortMatched(a,b){
  if(a.score < b.score)
    return -1;
  if(a.score > b.score)
    return 1;
  return 0;
}

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
