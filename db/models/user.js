const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  email: String,
  token: String
});

module.exports = mongoose.model("User", userSchema, "auth");
