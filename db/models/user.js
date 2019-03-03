const md5 = require("md5");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: String
});

userSchema.plugin(uniqueValidator);

// Define schema methods
userSchema.methods = {
  validatePassword: function(inputPassword) {
    var thisToken = md5(inputPassword);
    return thisToken === this.token;
  }
};

module.exports = mongoose.model("User", userSchema, "auth");
