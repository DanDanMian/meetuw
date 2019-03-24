const express = require("express");
const router = express.Router();

// TABLE_NAME
// const DailyMatching = require("../db/models/new_matching");
// ************************************** TODO: BUILD THE MODEL ***************
const MATCHING_MODEL = require("../db/models/matching");
const PROFILE_MODEL = require("../db/models/profile");
const ACADEMIC_MODEL = require("../db/models/academic");
const CAREER_MODEL = require("../db/models/career");
const DAILY_MODEL = require("../db/models/daily");
const HOBBY_MODEL = require("../db/models/hobby");

// CATEGORY
const ACADEMIC = "Academic"
const CAREER = "Career"
const DAILY = "Daily"
const HOBBY = "Hobby"

// ********************* MATCHING ALGORITHM *********************
// NOTE: the matching logic will be split into two parts
  // 1. Calculate the total score of the user 
  // 2. Find a match

// ********************* PART 1 *********************
// academic_score, career_score, casual_score = 0
// If req.body.userCase == Academic
      // academic_score = calculate_score(term, subject, catalog_number)
      // Create userObj and post to academic table
// Else If req.body.userCase == Career
      // career_score = calculate_career_score(term, city)
      // Create userObj and post to career table
// Else If req.body.userCase == Daily
      // casual_score = calculate_casual_score(...)
      // Create userObj and post to casual table
// Else If req.body.userCase == Hobby

// MATCHING_TABLE (SCORE_HISTORY)
// academic_total_score = ... (formula TBD)
// career_total_score   = ... (formula TBD)
// casual_total_score   = ... (formula TBD)
// Create userObj and post to matching table

// ********************* PART 2 *********************
// If Matching.table_size >= LIMIT
//    Perform MATCHING ALGO (which we could use the original logic I guess???)
//    Original logic with condition added

// EXAMPLE
//    career_total_score(x) - career_total_score(i) <= threshold (, career: 0, )
//    Cross_Score Matching --> (TOTAL_SCORE)
//      academic * w1 + career * w2 + daily * w3 + hobby * w4

function sortMatched(a, b) {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}

// Calculate the total score of 
//  given list of user defined terms and weights
function calculate_total_score(params, weights){
  var total_score = 0;
  var i;
  for (i = 0; i < params.length; i++){
    total_score += params[i] * weights[i];
  }
  return total_score;
}

function post_data_db(userObj, model) {

}

// Query category scores given user email
// Input: email 
// Output: all category scores
// function query_category_scores(email, model) {


// }

router.post("/api/match_request", function(req, res) {
  var academic_total_score = 0;
  var career_total_score = 0;
  var daily_total_score = 0;
  var hobby_total_score = 0;
  var model;

  var paramList, weightList;
  switch(req.body.userCase) {
    case Academic:
      // Calculate score
      var termScore = req.body.termOptions.indexOf(req.body.term) + 1;
      paramList = [req.body.id, parseInt(req.body.number, 10), termScore];
      weightList = [10000, 10, 1];
      academic_total_score = calculate_total_score(paramList, weightList);

      // Setup data that saves to the DB
      var userObj = {
        email: `${req.body.email}`,
        course: {
          term: `${req.body.term}`,
          subject: `${req.body.subject}`,
          catelog_number: `${req.body.number}`
        },
        score: totalScore
      };
      model = ACADEMIC_MODEL;
    
    case Career:
      var termScore = req.body.termOptions.indexOf(req.body.term) + 1;
      paramList = [req.body.city, termScore];
      weightList = [10, 10];
      career_total_score = calculate_total_score(paramList, weightList);

      var userObj = {
        email: `${req.body.email}`,
        userCase: `${req.body.userCase}`,
        content: {
          city: `${req.body.city}`,
          term: `${req.body.term}`
        },
        score: totalScore
      };
      model = CAREER_MODEL;
      
    case Daily:
      // TODO

    case Hobby:
      // TODO
  }

  // Run matching algorithm
    // 1. Calculate the total score of myself
    // career --> career[total] --> all categories score
    

    // 2. Exact match

    // 2. Cross-category matching (Similarity Match)



  // FINEL_STEP: Post userObj to specific table defined
  post_data_db(userObj, model);


}
module.exports = router;
