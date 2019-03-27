const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.DB_CONNECTION_STRING, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose.connection;
