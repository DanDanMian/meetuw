const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hobbySchema = new Schema({
  name: String,
  email: String,
  content: {
    hobby: String,
    term: String
  },
  score: Number
});

module.exports = mongoose.model("Hobby", hobbySchema, "hobby");
