const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

const logger = require('./utils/logger');
const awaitModule = require('./utils/awaitModule');

const db = awaitModule(require('./db/client'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
const staticFiles = express.static(path.join(__dirname, './client/build'));
app.use(staticFiles);

// Serve index.html to all non-JSON requests
const serveClient = require('./middlewares/serveClient');
app.use(serveClient);

app.post('/testpost', (req, res) => {
  console.log(req.body);
  res.send({ program: `${req.body.program}`, category: `${req.body.category}` });
});

app.post('/api/login', (req, res) => {
  console.log(req.body);
  if (req.body.email == 'test@uwaterloo.ca' && req.body.password == '12345') {
    res.send('SUCCESS');
  } else {
    res.send('FAIL');
  }
});

app.post('/api/match_request', require('./endpoints/matchRequest').post);

app.listen(port, () => {
  logger.debug(`Server listening on port ${port}`);
});
