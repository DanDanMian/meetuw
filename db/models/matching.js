const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchingSchema = new Schema({
  name: String,
  initials: String,
  avatar: String,
  email: String,
  program: String,
  course: {
    term: String,
    subject: String,
    catelog_number: String
  },
  score: Number
});

module.exports = mongoose.model("Matching", matchingSchema, "matching");
