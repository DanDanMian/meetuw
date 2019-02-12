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

module.exports = mongoose.model("User", userSchema, "auth");
