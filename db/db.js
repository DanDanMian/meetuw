const config = require("../config");
const mongoose = require("mongoose");
mongoose
  .connect(
    config.DB_CONNECTION_STRING,
    { useMongoClient: true, useNewUrlParser: true }
  );
  //.then(() => console.log("Connected to MongoDB!"))
  //.catch(err => console.error(err));
mongoose.Promise = global.Promise;

/* mongoose.connection.on("open", function() {
  console.log("mongodb is connected!!");
}); */

module.exports = {
  User: require("./models/user"),
  Matching: require("./models/matching")
};