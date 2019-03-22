const express = require("express");
const router = express.Router();

const Matching = require("../db/models/matching");

// Category
const Academic = "Academic"
const Career = "Career"
const Casual = "Casual"


const Limit = 20            // This defines the number requests
                            // needed to stored in the matching table


function sortMatched(a, b) {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}

// EXAMPLE OF MATCH REQUEST
    // {
    //   "useCase": "academic",
    //   "criteria": {
    //     "course": {
    //       "term": 1189,
    //       "subject": "CS",
    //       "catalog_number": "493"
    //     }
    //   }
    // }

// ********************* MATCHING ALGORITHM *********************
// NOTE: the matching logic will be split into two parts
  // 1. Calculate the total score of the user 
  // 2. Find a match

// ********************* PART 1 *********************
// academic_score, career_score, casual_score = 0
// If req.body.userCase == Academic
      // academic_score = calculate_academic_score(term, subject, catalog_number)
      // Create userObj and post to academic table
// Else If req.body.userCase == Career
      // career_score = calculate_career_score(term, city)
      // Create userObj and post to career table
// Else If req.body.userCase == Casual
      // casual_score = calculate_casual_score(...)
      // Create userObj and post to casual table

// academic_total_score = ... (formula TBD)
// career_total_score = ... (formula TBD)
// casual_total_score = ... (formula TBD)
// Create userObj and post to matching table

// ********************* PART 2 *********************
// If Matching.table_size >= LIMIT
//    Perform MATCHING ALGO (which we could use the original logic I guess???)
//    Original logic with condition added


router.post("/api/match_request", function(req, res) {


  //try to match a study buddy
  if (req.body.userCase == "Academic") {
  var termScore = "0";
  console.log("Academic");
  //translate term string to term number
  if (req.body.term == "Fall 2018") {
    termNum = 1189;
    termScore = 1;
  } else if (req.body.term == "Winter 2019") {
    termNum = 1191;
    termScore = 2;
  } else {
    termNum = 1195;
    termScore = 3;
  }

  var totalScore =
    req.body.id * 10000 + parseInt(req.body.number, 10) * 10 + termScore;

  var userObj = {
    name: `${req.body.name}`,
    email: `${req.body.email}`,
    course: {
      term: `${req.body.term}`,
      subject: `${req.body.subject}`,
      catelog_number: `${req.body.number}`
    },
    score: totalScore
  };

  Matching.findOne(userObj, function(err, dbResult) {
    if (err) throw err;
    if (dbResult == null) {
      Matching.create(userObj, function(err, dbResult) {
        if (err) throw err;
        console.log("User matching data inserted.");
      });
    }
  });

  //find match
  var lb, ub;
  if (termScore == 1) {
    lb = 0;
    ub = 2;
  } else if (termScore == 2) {
    lb = 1;
    ub = 1;
  } else {
    lb = 2;
    ub = 0;
  }
  var query = { score: { $gte: totalScore - lb, $lte: totalScore + ub } };

  Matching.find(query, function(err, dbResult) {
    if (err) throw err;

    //send result back
    if (dbResult.length < 1) {
      res.send("unmatched");
    } else {
      var noSelfRes = dbResult.filter(function(el) {
        return el.email != req.body.email;
      });
      if (noSelfRes.length == 0) {
        res.send("unmatched");
        return;
      }
      //calculate difference
      for (var i = 0; i < noSelfRes.length; i++) {
        if (noSelfRes[i].score - totalScore != 0) {
          noSelfRes[i].score = 1;
        } else {
          noSelfRes[i].score = 0;
        }
      }

      //sort low to high
      noSelfRes.sort(sortMatched);

      var highestScore = noSelfRes[0].score;
      var highestScoreRes = noSelfRes.filter(function(el) {
        return el.score == highestScore;
      });
      if (highestScoreRes.length == 0) {
        res.send("unmatched");
        return;
      }
      var randIndex = Math.floor(Math.random() * highestScoreRes.length);
      var randMatched = highestScoreRes[randIndex];

      var data = {
        name: `${randMatched.name}`,
        email: `${randMatched.email}`
      };

      res.send(JSON.stringify(data));
    }
  });
  }
  else if (req.body.userCase =="CasualDaily"){
    
  }
});

module.exports = router;
