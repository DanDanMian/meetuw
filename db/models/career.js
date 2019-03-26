const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const careerSchema = new Schema({
  name: String,
  email: String,
  content: {
    city: String,
    term: String
  },
  score: Number
});

module.exports = mongoose.model("Career", careerSchema, "career");