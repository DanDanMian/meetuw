const md5 = require("md5");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  email: String,
  token: String
});

// Define schema methods
userSchema.methods = {
  validatePassword: function(inputPassword) {
    var thisToken = md5(inputPassword);
    return thisToken === this.token;
  }
};

module.exports = mongoose.model("User", userSchema, "auth");
