const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const academicSchema = new Schema({
  name: String,
  email: String,
  course: {
    term: String,
    subject: String,
    catelog_number: String
  },
  score: Number
});

module.exports = mongoose.model("academic", academicSchema, "academic");
