const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

const logger = require('./utils/logger');
const loadModule = require('./utils/loadModule');

const db = loadModule(require('./db/client'));

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

app.post('/api/match_request', (req, res) => {
  console.log(`search criteria: ${req.body.term} ${req.body.subject} ${req.body.number}`);
  const matchedUser = '1';
  if (err) throw err;
  const Users = db.db('user');
  const query = {
    course: {
      term: `${req.body.term}`,
      subject: `${req.body.subject}`,
      catelog_number: `${req.body.number}`,
    },
  };
  console.log(`query: ${query.course.term} ${query.course.subject} ${query.course.catelog_number}`);

  Users.collection('matching').find(query).toArray((err, dbres) => {
    if (err) { console.log(err); throw err; }
    console.log(`db return arry: ${dbres}`);
    if (dbres.length < 1) {
      res.send('no match');
    } else {
      console.log('Matched!');
      const randMatched = dbres[Math.floor(Math.random() * dbres.length)];
      console.log(`Matched data: ${randMatched.name} ${randMatched.email}`);
      res.send({
        name: `${randMatched.name}`,
        email: `${randMatched.email}`,
      });
    }
  });
});

app.listen(port, () => {
  logger.debug(`Server listening on port ${port}`);
});
