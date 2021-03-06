const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailySchema = new Schema({
  name: String,
  email: String,
  content: {
    daily: String,
    term: String
  },
  score: Number
});

module.exports = mongoose.model("Daily", dailySchema, "daily");
