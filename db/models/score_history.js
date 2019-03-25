const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreHistorySchema = new Schema({
  name: String,
  email: String,
  academic_score: String,
  daily_score: String,
  hobby_score: String,
  career_score: String
});

module.exports = mongoose.model("ScoreHistory", ScoreHistorySchema, "score_history");
