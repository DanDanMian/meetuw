const express = require("express");
const router = express.Router();

const db = require("../db/db");
const Matching = db.Matching;

function sortMatched(a, b) {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}

router.post("/api/match_request", function(req, res) {
  var termScore = "0";

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
});

module.exports = router;
