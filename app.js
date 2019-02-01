const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const staticFiles = express.static(path.join(__dirname, "./client/build"));
app.use(staticFiles);

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
