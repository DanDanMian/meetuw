const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hobbySchema = new Schema({
  name: String,
  email: String,
  field: String,
  subfield: String,
  score: Number,
  cross_score: Number
});

module.exports = mongoose.model("Hobby", hobbySchema, "hobby");
