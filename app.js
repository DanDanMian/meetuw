const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

const logger = require('./utils/logger');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
const staticFiles = express.static(path.join(__dirname, './client/build'));
app.use(staticFiles);

app.get('/*', function(req,res){
  res.sendFile(path.resolve(__dirname, 'client', 'index.js'));
});

app.get('/test', (req, res) => {
  res.send('TEST');
});
// Serve index.html to all non-JSON requests
const serveClient = require('./middlewares/serveClient');

app.use(serveClient);

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
        res.send('unmatched');
      }else{
        console.log('Matched!');
        var randMatched = dbres[Math.floor(Math.random()*dbres.length)];
        console.log("Matched data: "+randMatched.name+" "+randMatched.email);
        res.send({name: `${randMatched.name}`, 
                  email: `${randMatched.email}`,
      });
      }
    });
  });  
});

app.post('/api/match_request', require('./endpoints/matchRequest').post);

app.listen(port, function(){
  console.log('Run on port '+port);
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
