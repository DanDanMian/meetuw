const express = require("express");
const router = express.Router();

const Matching = require("../db/models/matching");
const DailyMatching = require("../db/models/new_matching");

const Profile = require("../db/models/profile");

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

  var profObj = {
    email: `${req.body.email}`,
    courseSelection: {
      term: `${req.body.term}`,
      subject: `${req.body.subject}`,
      number: `${req.body.number}`,
      match: ""
    }
  };

  // Add to profile
  Profile.findOne(profObj, function(err, dbResult) {
    if (err) throw err;
    if (dbResult == null) {
      Profile.create(profObj, function(err, dbResult) {
        if (err) throw err;
      });
    } else {
      Profile.updateOne(profObj, function(err, dbResult) {
        if (err) throw err;
      });
    }
  });

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

      var userByEmail = {
        email: `${req.body.email}`,
        courseSelection: {
          term: `${req.body.term}`,
          subject: `${req.body.subject}`,
          number: `${req.body.number}`,
          match: randMatched.email
        }
      };
      
      Profile.updateOne(userByEmail, function(err, dbResult) {
        if (err) throw err;
      });

      res.send(JSON.stringify(data));
    }
  });
  } else if (req.body.userCase =="CasualDaily" 
  || req.body.userCase =="CasualHobby"){
    var score = 0;
    var totalScore = 0;
    if (req.body.userCase =="CasualDaily" ) {
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
      totalScore = req.body.id*100 + score;
    } else{
      totalScore = req.body.id1*1000 + req.body.id2*20;
    } 
    var userObj = {
      name:`${req.body.name}`,
      email:`${req.body.email}`,
      userCase:`${req.body.userCase}`,
      content:{
        field:`${req.body.category}`,
        subfield:`${req.body.preference}`,
      },
      score: totalScore
    };

    var daily = {
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

    var hobby = {
      name:`${req.body.name}`,
      email:`${req.body.email}`,
      userCase:`${req.body.userCase}`,
      content:{
        field:`${req.body.category}`,
        subfield:`${req.body.preference}`,
      },
      score: totalScore
    };

    DailyMatching.findOne(userObj, function(err, dbResult) {
      if (err) throw err;
      if (dbResult == null){
        var ub = null;
        if (req.body.userCase == "CasualDaily") {
            ub = daily; 
        } else {
            ub = hobby; 
        }
        DailyMatching.create(ub, function(err, dbResult) {
          console.log("created");
          if (err) throw err;
        });
      }
    });

    var query = {score: totalScore};
    DailyMatching.find(query, function(err, dbResult) {
       if (err) throw err;
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

        };
        res.send(JSON.stringify(data));
        return;
    });
  }
});

module.exports = router;
