const express = require("express");
const router = express.Router();

// TABLE_NAME
// const DailyMatching = require("../db/models/new_matching");
// ************************************** TODO: BUILD THE MODEL ***************
const MATCHING_MODEL = require("../db/models/score_history");
const CONSTANT = require("../routes/constant");
const PROFILE_MODEL = require("../db/models/profile");
const ACADEMIC_MODEL = require("../db/models/academic");
const CAREER_MODEL = require("../db/models/career");
const DAILY_MODEL = require("../db/models/daily");
const HOBBY_MODEL = require("../db/models/hobby");
const Profile = require("../db/models/profile");

// CATEGORY
const ACADEMIC = "Academic";
const CAREER = "Career";
const DAILY = "Daily";
const HOBBY = "Hobby";

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

// Calculate the total score of
//  given list of user defined terms and weights
function calculate_total_score(params, weights) {
  var total_score = 0;
  var i;
  for (i = 0; i < params.length; i++) {
    total_score += params[i] * weights[i];
  }
  return total_score;
}

function post_data_db(userObj, matchingObj, model, userCase) {
  var email = userObj.email;
  model.findOne({ email: email }, function(err, res) {
    if (res == null) {
      model.create(userObj, function(err, res) {});
    } else {
      var score = userObj.score;
      model.updateOne({ email: email }, { score: score }, function(err, res) {
        if (err) throw err;
      });
    }
  });

  MATCHING_MODEL.findOne({ email: email }, function(err, res) {
    if (res == null) {
      if (userCase == "Academic") {
        matchingObj.academic_score = userObj.score;
      } else if (userCase == "Career") {
        matchingObj.career_score = userObj.score;
      } else if (userCase == "Daily") {
        matchingObj.daily_score = userObj.score;
      } else {
        matchingObj.hobby_score = userObj.score;
      }
      MATCHING_MODEL.create(matchingObj, function(err, res) {});
    } else {
      var query;
      var score = userObj.score;
      if (userCase == "Academic") {
        query = { academic_score: score };
      } else if (userCase == "Career") {
        query = { career_score: score };
      } else if (userCase == "Daily") {
        query = { daily_score: score };
      } else {
        query = { hobby_score: score };
      }
      MATCHING_MODEL.updateOne({ email: email }, query, function(err, res) {
        if (err) throw err;
      });
    }
  });
}

function cross_category_score(param1, param2, wList, rangeList) {
  var sum = 0;
  for (var i = 0; i < 4; ++i) {
    const score =
      Math.sqrt(Math.abs(param1[i] - param2[i]) / rangeList) * wList[i];
    sum = sum + score;
  }
  return sum;
}

// Query category scores given user email
// Input: email
// Output: all category scores
// function query_category_scores(email, model) {

// }

router.post("/api/match_request", function(req, res) {
  var userCase = req.body.userCase;
  var my_category_score = 0;
  var academic_total_score = 0;
  var career_total_score = 0;
  var daily_total_score = 0;
  var hobby_total_score = 0;
  var model, userObj;

  var paramList, weightList;
  var matchingObj = {
    email: `${req.body.email}`,
    name: `${req.body.name}`,
    academic_score: 0,
    career_score: 0,
    daily_score: 0,
    hobby_score: 0
  };

  const uc = req.body.userCase;

  switch (uc) {
    case ACADEMIC:
      // Calculate score
      var termScore = req.body.termOptions.indexOf(req.body.term) + 1;
      var subjectScore = req.body.subjectOptions.indexOf(req.body.subject) + 1;
      var numberScore = req.body.numberOptions.indexOf(req.body.number) + 1;
      paramList = [subjectScore, numberScore, termScore];
      weightList = [100000, 10, 1];

      academic_total_score = calculate_total_score(paramList, weightList);

      // Setup data that saves to the DB
      userObj = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        course: {
          term: `${req.body.term}`,
          subject: `${req.body.subject}`,
          catelog_number: `${req.body.number}`
        },
        score: academic_total_score
      };

      model = ACADEMIC_MODEL;
      my_category_score = academic_total_score;

      break;

    case CAREER:
      var termScore = CONSTANT.termOptions.indexOf(req.body.term) + 1;
      var cityScore = CONSTANT.cityOptions.indexOf(req.body.city) + 1;
      paramList = [cityScore, termScore];
      weightList = [10, 1];
      career_total_score = calculate_total_score(paramList, weightList);

      userObj = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        content: {
          city: `${req.body.city}`,
          term: `${req.body.term}`
        },
        score: career_total_score
      };
      model = CAREER_MODEL;
      my_category_score = career_total_score;
      break;

    case "Daily":
      var termScore = CONSTANT.termOptions.indexOf(req.body.term) + 1;
      var dailyScore = CONSTANT.dailyOptions.indexOf(req.body.category) + 1;

      // console.log(dailyScore + " " + termScore );
      paramList = [dailyScore, termScore];
      weightList = [10, 1];
      daily_total_score = calculate_total_score(paramList, weightList);
      // console.log(daily_total_score + " total" );

      userObj = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        content: {
          daily: `${req.body.category}`,
          term: `${req.body.term}`
        },
        score: daily_total_score
      };

      model = DAILY_MODEL;
      my_category_score = daily_total_score;
      break;

    case HOBBY:
      var fieldScore = CONSTANT.hobbyOptions.indexOf(req.body.category) + 1;
      //    console.log(HOBBY);
      //  console.log(req.body.userCase);
      //    console.log(CONSTANT.subFields);
      //  console.log(CONSTANT.subFields[0]);
      //   console.log(req.body.category);

      var subFieldScore =
        CONSTANT.subFields[fieldScore - 1].indexOf(req.body.preference) + 1;
      paramList = [fieldScore, subFieldScore];
      weightList = [100, 2];
      hobby_total_score = calculate_total_score(paramList, weightList);

      userObj = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        content: {
          hobby: `${req.body.category}`,
          term: `${req.body.preference}`
        },
        score: hobby_total_score
      };

      model = HOBBY_MODEL;
      my_category_score = hobby_total_score;
      break;
  }

  // Add user selections to profile, clear matches for when they're unmatched
  var userByEmail = { email: req.body.email };
  Profile.findOne(userByEmail, function(err, user) {
    if (err) throw err;
    if (user) {
      user.name = userObj.name;
      user.email = userObj.email;

      switch (uc) {
        case ACADEMIC:
          user.courseSelection.term = userObj.course.term;
          user.courseSelection.subject = userObj.course.subject;
          user.courseSelection.number = userObj.course.catelog_number;
          user.courseSelection.match = "";
          user.courseSelection.matches = [];
          break;
        case CAREER:
          user.career.city = userObj.content.city;
          user.career.term = userObj.content.term;
          user.career.match = "";
          user.career.matches = [];
          break;
        case DAILY:
          user.casualDaily.daily = userObj.content.daily;
          user.casualDaily.term = userObj.content.term;
          user.casualDaily.match = "";
          user.casualDaily.matches = [];
          break;
        case HOBBY:
          user.casualHobby.hobby = userObj.content.hobby;
          user.casualHobby.term = userObj.content.term;
          user.casualHobby.match = "";
          user.casualHobby.matches = [];
          break;
      }

      user.save(function(err) {
        if (err) throw err;
      });
    }
  });

  // Run matching algorithm
  // 1. Calculate the total score of myself
  // career --> career[total] --> all categories score
  MATCHING_MODEL.findOne({ email: `${req.body.email}` }, function(err, res) {
    if (res != null) {
      academic_total_score =
        academic_total_score == 0 ? res.academic_score : academic_total_score;
      career_total_score =
        career_total_score == 0 ? res.career_score : career_total_score;
      daily_total_score =
        daily_total_score == 0 ? res.daily_score : daily_total_score;
      hobby_total_score =
        hobby_total_score == 0 ? res.hobby_score : hobby_total_score;
    }
  });

  // 2. Exact match
  var query = { score: my_category_score };
  let dbResult;
  model.find(query, function(err, re) {
    dbResult = re;
    //     console.log(JSON.stringify(re) + " not null") ;

    //    console.log(dbResult);
    dbResult = dbResult.filter(function(el) {
      return el.email != req.body.email;
    });

    //    console.log(dbResult + "here");
    if (dbResult.length == 0) {
      //   console.log("inside first");

      if (career_total_score != 0) {
        // for career, it did not find a exact matching, and return "unmatched"
        // it does not provide the similar match for career
        post_data_db(userObj, matchingObj, model, userCase);
        res.send("unmatched");
        return;
      } else {
        //start the similar matching

        //    console.log("inside second");

        var lowerBound, upperBound;
        if (userCase == "Academic" || userCase == "Daily") {
          /*For academic, it will match someone who takes the same 
          course but in different term.
          For daily, it will match someone who chooses the same 
          category but in different term*/
          lowerBound = my_category_score - (my_category_score % 10);
          upperBound = lowerBound + 10;
        } else {
          //for hobby, bounds are different from other category
          lowerBound = my_category_score - (my_category_score % 100);
          upperBound = lowerBound + 100;
        }

        //   console.log("inside third");

        //find all other similar matchings with given bounds
        const similarQuery = { score: { $gte: lowerBound, $lte: upperBound } };
        let cur;
        model.find(similarQuery, function(err, db) {
          //   console.log("inside forth" + JSON.stringify(db));
          cur = db;
          cur = cur.filter(function(el) {
            return el.email != req.body.email;
          });
          if (cur.length == 0) {
            //    console.log("should be here");
            // did not find any similar matching with given bounds
            post_data_db(userObj, matchingObj, model, userCase);
            res.send("unmatched");
            return;
          }

          //   console.log("sixth");

          let result = cur;

          // caculate the diff between this obj and  each similar matching
          result.forEach(e => {
            e.score = Math.abs(e.score - my_category_score);
          });

          //sort result by score difference in ascending orde
          result.sort(function(x, y) {
            return parseInt(x.score) - parseInt(y.score);
          });

          // return the similar matching that has the minimum diff
          //   console.log(result + "resssssss");
          var Matched = result[0];
          var data = {
            name: `${Matched.name}`,
            email: `${Matched.email}`,
            myname: `${req.body.name}`,
            myemail: `${req.body.email}`,
            type: "similarly matched"
          };

          const matches = [];
          const len = (result.length > 3)? 3: len; 
          for (let i = 0; i < len; ++i) {
            matches.push(result[i].email);
          }

          // Add user matches to profile
          const userByEmail = { email: req.body.email };
          Profile.findOne(userByEmail, function(err, user) {
            if (err) throw err;
            if (user) {
              switch (uc) {
                case ACADEMIC:
                  user.courseSelection.match = Matched.email;
                  user.courseSelection.matches = matches;
                  break;
                case CAREER:
                  user.career.match = Matched.email;
                  user.career.matches = matches;
                  break;
                case DAILY:
                  user.casualDaily.match = Matched.email;
                  user.casualDaily.matches = matches;
                  break;
                case HOBBY:
                  user.casualHobby.match = Matched.email;
                  user.casualHobby.matches = matches;
                  break;
              }

              user.save(function(err) {
                if (err) throw err;
              });
            }
          });

          post_data_db(userObj, matchingObj, model, userCase);
          res.send(JSON.stringify(data));
          return;
        });
      }
    } else {
      //now start the exact matching

      //   console.log(dbResult + "fuccckkkkkkhere");

    
      var result = dbResult;
      
      console.log(req.body.email+ "el");
      console.log(result+ "rrrrrrrrrrr");
      result.forEach(e => {
        var el = e.email;
        MATCHING_MODEL.findOne({ email: el }, function(err, result) {
          // Cross-category matching
          var param1 = [
            academic_total_score,
            career_total_score,
            daily_total_score,
            hobby_total_score
          ];

          var w1 = userCase == "Academic" ? 0.85 : 0.05;
          var w2 = userCase == "Career" ? 0.85 : 0.05;
          var w3 = userCase == "Daily" ? 0.85 : 0.05;
          var w4 = userCase == "Hobby" ? 0.85 : 0.05;
          var wList = [w1, w2, w3, w4];

          var academic_score =
            result.academic_score || academic_total_score
              ? 0
              : result.academic_score;
          var career_score =
            result.career_score || career_total_score ? 0 : result.career_score;
          var daily_score =
            result.daily_score || daily_total_score ? 0 : result.daily_score;
          var hobby_score =
            result.hobby_score || hobby_total_score ? 0 : result.hobby_score;
          var param2 = [academic_score, career_score, daily_score, hobby_score];

          //must know the range of course!!!
          var rangeList = [15500023, 44, 54, 424];

          e.score = cross_category_score(param1, param2, w1, rangeList);
          //    console.log(e.score + " " + e.email);
        });
      });

      result.sort(function(x, y) {
        return parseFloat(x.score) - parseFloat(y.score);
      });

      var Matched = result[0];
      var data = {
        name: `${Matched.name}`,
        email: `${Matched.email}`,
        myname: `${req.body.name}`,
        myemail: `${req.body.email}`,
        type: "exactly matched"
      };

      const matches = [];
      const len = (result.length > 3)? 3: len; 
      for (let i = 0; i < len; ++i) {
        matches.push(result[i].email);
      }

      // Add user matches to profile
      const userByEmail = { email: req.body.email };
      Profile.findOne(userByEmail, function(err, user) {
        if (err) throw err;
        if (user) {
          switch (uc) {
            case ACADEMIC:
              user.courseSelection.match = Matched.email;
              user.courseSelection.matches = matches;
              break;
            case CAREER:
              user.career.match = Matched.email;
              user.career.matches = matches;
              break;
            case DAILY:
              user.casualDaily.match = Matched.email;
              user.casualDaily.matches = matches;
              break;
            case HOBBY:
              user.casualHobby.match = Matched.email;
              user.casualHobby.matches = matches;
              break;
          }

          user.save(function(err) {
            if (err) throw err;
          });
        }
      });

      post_data_db(userObj, matchingObj, model, userCase);
      res.send(JSON.stringify(data));
      return;
    }
   });
  // FINEL_STEP: Post userObj to specific table defined
});

module.exports = router;
