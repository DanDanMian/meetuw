const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true
  },
  courseSelection: {
    term: String,
    subject: String,
    number: String,
    match: String,
    matches: [{ type: String }]
  },
  casualDaily: {
    daily: String,
    term: String,
    match: String,
    matches: [{ type: String }]
  },
  casualHobby: {
    hobby: String,
    term: String,
    match: String,
    matches: [{ type: String }]
  },
  career: {
    city: String,
    term: String,
    match: String,
    matches: [{ type: String }]
  }
});

module.exports = mongoose.model("Profile", profileSchema);
