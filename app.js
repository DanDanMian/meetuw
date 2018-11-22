var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
const path = require('path');


MongoClient.connect("mongodb://admin:0000@meetuw-shard-00-00-5sqfz.mongodb.net:27017,meetuw-shard-00-01-5sqfz.mongodb.net:27017,meetuw-shard-00-02-5sqfz.mongodb.net:27017/test?ssl=true&replicaSet=meetuw-shard-0&authSource=admin", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//app.use(express.static(path.resolve(__dirname, './client/build')));
const staticFiles = express.static(path.join(__dirname, './client/build'));
app.use(staticFiles);


app.get('/test', function(req, res){
  res.send('TEST');
});

app.get('/', function(req, res){
  res.send('CONNECTED');
});

app.get('*', staticFiles);


app.listen(port, function(){
  console.log('Run on port '+port);
  console.log(`Server running at http://127.0.0.1:${port}/`);
});



