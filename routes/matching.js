const express = require("express");
const router = express.Router();

const Matching = require("../db/models/matching");
const DailyMatching = require("../db/models/new_matching");


function sortMatched(a, b) {
  if (a.score < b.score) return -1;
  if (a.score > b.score) return 1;
  return 0;
}

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
  } else if (req.body.userCase =="CasualDaily"){

    var score = 0;
    if (req.body.preference == "male") {
        score = 3;
    } else if (req.body.preference == "female"){
        score = 6;
    } 

    if (req.body.gender == "male") {
      score *= 3;
  } else if (req.body.preference == "female"){
      score *= 6;
  } 

    var totalScore = req.body.id*100 + score;
    var userObj = {
      name:`${req.body.name}`,
      email:`${req.body.email}`,
      userCase:`${req.body.userCase}`,
      content:{
        field:`${req.body.category}`,
      },
      score: totalScore
    };


    var user = {
      name:`${req.body.name}`,
      email:`${req.body.email}`,
      userCase:`${req.body.userCase}`,
      gender:`${req.body.gender}`,
      content:{
        field:`${req.body.category}`,
        subfield:`${req.body.preference}`,
      },
      score: totalScore
    };

    DailyMatching.findOne(userObj, function(err, dbResult) {
      if (err) throw err;
      if (dbResult == null){

        DailyMatching.create(user, function(err, dbResult) {
          console.log("created");
          if (err) throw err;
        });
      }
    });

    var query = {
      userCase:`${req.body.userCase}`,
      content:{
        field:`${req.body.category}`,
      },
      score: totalScore
    };
    DailyMatching.find(query, function(err, dbResult) {
       if (err) throw err;
        console.log("noSSSSSS");
        console.log(JSON.stringify(dbResult));
        var MatchedList = dbResult;
        const length = MatchedList.length;
        var index = -1;
        const email = req.body.email;
        for (var i = 0; i < length; ++i) {
            if (MatchedList[i].email != email) {
              index = i;
              break;
            }
        }
        if (index == -1) {
          res.send("unmatched");
          return;
        }
        var Matched = MatchedList[index];
        var data = {
          name: `${Matched.name}`,
          email:`${Matched.email}`,
          gender:`${Matched.gender}`,
        };
        res.send(JSON.stringify(data));
        return;
    });
  }
});

module.exports = router;
