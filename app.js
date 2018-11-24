const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const logger = require('./util/logger')

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

app.listen(port, () => {
  logger.debug(`Server listening on port ${port}`);
});
