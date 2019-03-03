const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db = require("./db/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const staticFiles = express.static(path.join(__dirname, "./client/build"));
app.use(staticFiles);

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  session({
    secret: "fraggle-rock", //need to pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: db }),
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./middlewares/serveClient"));

app.get("/", (req, res) => {
  res.send("CONNECTED");
});

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/matching"));

app.listen(port, function() {
  console.log("Run on port " + port);
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
