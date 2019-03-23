const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  courseSelection: {
      term: String,
      subject: String,
      number: String,
      match: String,
      t: [{type: String}]
  }
});

module.exports = mongoose.model("Profile", profileSchema);
