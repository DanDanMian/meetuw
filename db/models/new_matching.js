const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyMatchingSchema = new Schema({
  name: String,
  initials: String,
  avatar: String,
  email: String,
  program: String,
  gender: String,
  userCase: String,
  content: {
    field: String,
    subfield: String,
  },
  score: Number
});

module.exports = mongoose.model("CasualMatching", DailyMatchingSchema, "new_matching");
