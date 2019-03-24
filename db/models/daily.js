const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailySchema = new Schema({
  name: String,
  email: String,
  field: String,
  gender: String,
  gender_preference: String,
  score: Number,
  cross_score: Number
});

module.exports = mongoose.model("Daily", dailySchema, "daily");
