const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');


MongoClient.connect('mongodb://admin:0000@meetuw-shard-00-00-5sqfz.mongodb.net:27017,meetuw-shard-00-01-5sqfz.mongodb.net:27017,meetuw-shard-00-02-5sqfz.mongodb.net:27017/test?ssl=true&replicaSet=meetuw-shard-0&authSource=admin', (err, db) => {
  if (!err) {
    console.log('We are connected to DB');
  }
});

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const staticFiles = express.static(path.join(__dirname, './client/build'));
app.use(staticFiles);


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
  if (req.body.email == 'test@uwaterloo.ca' && req.body.password == '12345') {
    res.send('login successful');
  } else {
    res.send('Wrong Email or Password!');
  }
});

app.post('/match_request', (req, res) => {
  console.log(req.body);
  res.send();
});

app.get('*', staticFiles);


app.listen(port, () => {
  console.log(`Run on port ${port}`);
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
