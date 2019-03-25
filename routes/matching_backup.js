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

function post_data_db(userObj, matchingObj, model, userCase) {
  var email = userObj.email;
  model.findOne({email:email}, function(err, res){
    if (res == null) {
      model.create(userObj,function(err,res){});
    } else {
      var score = userObj.score;
      model.updateOne({email: email}, {score: score},function(err,res) {
        if (err) throw err;
      });
    }
  });

  MATCHING_MODEL.findOne({email:email}, function(err, res){
    if (res == null) {
      MATCHING_MODEL.create(matchingObj, function(err, res) {});
    } else {
      var score = userObj.score;
      if (userCase == "Academic") {
        MATCHING_MODEL.updateOne({email: email}, {academic_score: score},function(err,res) {
          if (err) throw err;
        });
      } else if (userCase =="Career"){
        MATCHING_MODEL.updateOne({email: email}, {career_score: score},function(err,res) {
          if (err) throw err;
        });
      } else if (userCase == "Daily") {
        MATCHING_MODEL.updateOne({email: email}, {daily_score: score},function(err,res) {
          if (err) throw err;
        });
      } else {
        MATCHING_MODEL.updateOne({email: email}, {hobby_score:score},function(err,res) {
          if (err) throw err;
        });
      }
  }});
}


function cross_category_score (param1, param2, wList, rangeList){
  var sum = 0;
  for (var i = 0; i < 4; ++i) {
    const score = Math.sqrt(Math.abs(param1[i] - param2[i])/rangeList) * wList[i];
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
  var model,userObj;


  var paramList, weightList;
  var matchingObj = {
    email: `${req.body.email}`,
    name: `${req.body.name}`,
    academic_score: 0,
    career_score: 0,
    daily_score: 0,
    hobby_score:0,
  };

  switch(req.body.userCase) {
    case Academic:
      // Calculate score
      var termScore = req.body.termOptions.indexOf(req.body.term) + 1;
      var subjectScore = req.body.subjectOptions.indexOf(req.body.subject) + 1;
      var numberScore = req.body.numberOptions.indexOf(req.body.number) + 1;
      paramList = [subjectScore, numberScore , termScore];
      weightList = [10000,10,1];

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
    
    
    case Career:
      var termScore = req.body.termOptions.indexOf(req.body.term) + 1;
      var cityScore = req.body.cityOptions.indexOf(req.body.city) + 1;
      paramList = [cityScore, termScore];
      weightList = [10, 1];
      career_total_score = calculate_total_score(paramList, weightList);

      userObj = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        userCase: `${req.body.userCase}`,
        content: {
          city: `${req.body.city}`,
          term: `${req.body.term}`
        },
        score: career_total_score
      };
      model = CAREER_MODEL;
      my_category_score = career_total_score;
      
    case Daily:
      var termScore = req.body.termOptions.indexOf(req.body.term) + 1;
      var dailyScore = req.body.dailyOptions.indexOf(req.body.daily) + 1;
      paramList = [dailyScore, termScore];
      weightList = [10, 1];
      daily_total_score = calculate_total_score(paramList, weightList);

      userObj = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        userCase: `${req.body.userCase}`,
        content: {
          daily: `${req.body.daily}`,
          term: `${req.body.term}`
        },
        score: daily_total_score
      };
      model = DAILY_MODEL;
      my_category_score = daily_total_score;
    
    case Hobby:
      var fieldScore = req.body.fieldOptions.indexOf(req.body.field) + 1;
      var subFieldScore = req.body.subfieldOptions.indexOf(req.body.subfield) + 1;
      paramList = [fieldScore, subFieldScore];
      weightList = [100, 1];
      hobby_total_score = calculate_total_score(paramList, weightList);

      userObj = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        userCase: `${req.body.userCase}`,
        content: {
          hobby: `${req.body.field}`,
          term: `${req.body.subfield}`
        },
        score: hobby_total_score
      };
      model = HOBBY_MODEL;
      my_category_score = hobby_total_score;
  }

  // Run matching algorithm
    // 1. Calculate the total score of myself
    // career --> career[total] --> all categories score
  

    MATCHING_MODEL.findOne({email:`${req.body.email}`}, function(err,res){
      academic_total_score = academic_total_score == 0 ? res.academic_score : academic_total_score;
      career_total_score = career_total_score == 0 ? res.career_score : career_total_score;
      daily_total_score = daily_total_score == 0 ? res.daily_score : daily_total_score;
      hobby_total_score = hobby_total_score == 0 ? res.hobby_score : hobby_total_score;
    });

    // 2. Exact match
    var query =  {score: my_category_score, email: {$ne:`${req.body.email}`}};
    var dbResult;
    model.find(query, function (err,res){
      dbResult = res;
    });


    if (dbResult == null) {
      if (career_total_score != 0){
        // for career, it did not find a exact matching, and return "unmatched"
        // it does not provide the similar match for career
        post_data_db(userObj,matchingObj, model,userCase);
        res.send("unmatched");
        return;
      } else {
        //start the similar matching
        var lowerBound, upperBound;
        if (userCase == "Academic" 
        || userCase == "Daily") {

          /*For academic, it will match someone who takes the same 
          course but in different term.
          For daily, it will match someone who chooses the same 
          category but in different term*/
          lowerBound = my_category_score - my_category_score % 10;
          upperBound = lowerBound + 10;
        } else {
          //for hobby, bounds are different from other category
          lowerBound = totalScore - totalScore % 100;
          upperBound = lowerBound + 100;
        }     

        //find all other similar matchings with given bounds
        const similarQuery = {score: { $gte: lowerBound, $lte: upperBound}, 
        email:{$ne:`${req.body.email}`}};

      
        model.find(similarQuery,function(err, dbResult){

          var result = dbResult;
          if ( dbResult == null) {

            // did not find any similar matching with given bounds
            post_data_db(userObj,matchingObj, model,userCase);
            res.send("unmatched");
            return;
          } 


          // caculate the diff between this obj and  each similar matching
          result.forEach((e) => {
            e.score = Math.abs(e.score - my_category_score);
          });

          //sort result by score difference in ascending orde
          result.sort(function(x, y) {
            return parseInt(x.score) - parseInt(y.score);
          });

          // return the similar matching that has the minimum diff
          var Matched = result[0];
          var data = {
            name: `${Matched.name}`,
            email: `${Matched.email}`,
            type: "similarly matched"
          };
          post_data_db(userObj,matchingObj, model,userCase);
          res.send(JSON.stringify(data));
          return;
        });
      }

    } else {
      //now start the exact matching 
      var result = dbResult;
      result.forEach((e) => {
        var el = e.email;
        MATCHING_MODEL.findOne({email:el}, function(err,result){
          // Cross-category matching
          var param1 = [academic_total_score, career_total_score, daily_total_score, hobby_total_score];

          var w1 = userCase == "Academic" ? 0.85: 0.05;
          var w2 = userCase == "Career" ? 0.85: 0.05;
          var w3 = userCase == "Daily" ? 0.85: 0.05;
          var w4 = userCase == "Hobby" ? 0.85: 0.05;
          var wList = [w1, w2, w3, w4];

          var academic_score =  (result.academic_score || academic_total_score) ? 0:result.academic_score;
          var career_score = (result.career_score ||career_total_score) ? 0:result.career_score;
          var daily_score = (result.daily_score || daily_total_score) ? 0:result.daily_score;
          var hobby_score = (result.hobby_score || hobby_total_score) ? 0:result.hobby_score;
          var param2 = [academic_score, career_score, daily_score, hobby_score];
  
          //must know the range of course!!!
          var rangeList = [1563992, 44, 54, 512];

          e.score = cross_category_score(param1, param2, w1, rangeList);
        });

        result.sort(function(x, y) {
          return parseFloat(x.score) - parseFloat(y.score);
        });

        var Matched = result[0];
          var data = {
            name: `${Matched.name}`,
            email: `${Matched.email}`,
            type: "exactly matched"
          };
          post_data_db(userObj,matchingObj, model,userCase);
          res.send(JSON.stringify(data));
          return;
      });
    }
  // FINEL_STEP: Post userObj to specific table defined

});

module.exports = router;
