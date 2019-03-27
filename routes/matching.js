// const express = require("express");
// const router = express.Router();

// const Matching = require("../db/models/matching");
// const DailyMatching = require("../db/models/new_matching");

// const Profile = require("../db/models/profile");

// // Category
// const Academic = "Academic";
// const Career = "Career";
// const Casual = "Casual";

// const Limit = 20; // This defines the number requests
// // needed to stored in the matching table

// function sortMatched(a, b) {
//   if (a.score < b.score) return -1;
//   if (a.score > b.score) return 1;
//   return 0;
// }

// // EXAMPLE OF MATCH REQUEST
// // {
// //   "useCase": "academic",
// //   "criteria": {
// //     "course": {
// //       "term": 1189,
// //       "subject": "CS",
// //       "catalog_number": "493"
// //     }
// //   }
// // }

// // ********************* MATCHING ALGORITHM *********************
// // NOTE: the matching logic will be split into two parts
// // 1. Calculate the total score of the user
// // 2. Find a match

// // ********************* PART 1 *********************
// // academic_score, career_score, casual_score = 0
// // If req.body.userCase == Academic
// // academic_score = calculate_academic_score(term, subject, catalog_number)
// // Create userObj and post to academic table
// // Else If req.body.userCase == Career
// // career_score = calculate_career_score(term, city)
// // Create userObj and post to career table
// // Else If req.body.userCase == Casual
// // casual_score = calculate_casual_score(...)
// // Create userObj and post to casual table

// // academic_total_score = ... (formula TBD)
// // career_total_score = ... (formula TBD)
// // casual_total_score = ... (formula TBD)
// // Create userObj and post to matching table

// // ********************* PART 2 *********************
// // If Matching.table_size >= LIMIT
// //    Perform MATCHING ALGO (which we could use the original logic I guess???)
// //    Original logic with condition added

// router.post("/api/match_request", function(req, res) {
//   //try to match a study buddy
//   if (req.body.userCase == "Academic") {
//     var termScore = "0";
//     console.log("Academic");
//     //translate term string to term number
//     if (req.body.term == "Fall 2018") {
//       termNum = 1189;
//       termScore = 1;
//     } else if (req.body.term == "Winter 2019") {
//       termNum = 1191;
//       termScore = 2;
//     } else {
//       termNum = 1195;
//       termScore = 3;
//     }

//     var totalScore =
//       req.body.id * 10000 + parseInt(req.body.number, 10) * 10 + termScore;

//     var userObj = {
//       name: `${req.body.name}`,
//       email: `${req.body.email}`,
//       course: {
//         term: `${req.body.term}`,
//         subject: `${req.body.subject}`,
//         catelog_number: `${req.body.number}`
//       },
//       score: totalScore
//     };

//     var userByEmail = { email: `${req.body.email}` };
//     var profObj = {
//       email: `${req.body.email}`,
//       courseSelection: {
//         term: `${req.body.term}`,
//         subject: `${req.body.subject}`,
//         number: `${req.body.number}`
//       }
//     };

//     // Add course selections to profile
//     Profile.findOne(userByEmail, function(err, user) {
//       if (err) throw err;
//       if (user == null) {
//         Profile.create(profObj, function(err, dbResult) {
//           if (err) throw err;
//         });
//       } else {
//         user.courseSelection.term = `${req.body.term}`;
//         user.courseSelection.subject = `${req.body.subject}`;
//         user.courseSelection.number = `${req.body.number}`;

//         user.save(function(err) {
//           if (err) throw err;
//         });
//       }
//     });

//     Matching.findOne(userObj, function(err, dbResult) {
//       if (err) throw err;
//       if (dbResult == null) {
//         Matching.create(userObj, function(err, dbResult) {
//           if (err) throw err;
//           console.log("User matching data inserted.");
//         });
//       }
//     });

//     //find match
//     var lb, ub;
//     if (termScore == 1) {
//       lb = 0;
//       ub = 2;
//     } else if (termScore == 2) {
//       lb = 1;
//       ub = 1;
//     } else {
//       lb = 2;
//       ub = 0;
//     }
//     var query = { score: { $gte: totalScore - lb, $lte: totalScore + ub } };

//     Matching.find(query, function(err, dbResult) {
//       if (err) throw err;

//       //send result back
//       if (dbResult.length < 1) {
//         res.send("unmatched");
//       } else {
//         var noSelfRes = dbResult.filter(function(el) {
//           return el.email != req.body.email;
//         });
//         if (noSelfRes.length == 0) {
//           res.send("unmatched");
//           return;
//         }
//         //calculate difference
//         for (var i = 0; i < noSelfRes.length; i++) {
//           if (noSelfRes[i].score - totalScore != 0) {
//             noSelfRes[i].score = 1;
//           } else {
//             noSelfRes[i].score = 0;
//           }
//         }

//         //sort low to high
//         noSelfRes.sort(sortMatched);

//         var highestScore = noSelfRes[0].score;
//         var highestScoreRes = noSelfRes.filter(function(el) {
//           return el.score == highestScore;
//         });

//         if (highestScoreRes.length == 0) {
//           // Update profile to be matchless
//           var userByEmail = { email: `${req.body.email}` };
//           Profile.findOne(userByEmail, function(err, user) {
//             if (err) throw err;
//             if (user) {
//               user.courseSelection.match = "";

//               user.save(function(err) {
//                 if (err) throw err;
//               });
//             }
//           });
//           res.send("unmatched");
//           return;
//         }

//         var randIndex = Math.floor(Math.random() * highestScoreRes.length);
//         var randMatched = highestScoreRes[randIndex];

//         var data = {
//           name: `${randMatched.name}`,
//           email: `${randMatched.email}`
//         };

//         var userByEmail = { email: `${req.body.email}` };
//         var matches = [];

//         for (var i = 0; i < highestScoreRes.length; ++i) {
//           matches.push(highestScoreRes[i].email);
//         }

//         // Add matches to profile
//         Profile.findOne(userByEmail, function(err, user) {
//           if (err) throw err;
//           if (user) {
//             user.courseSelection.match = randMatched.email;
//             user.courseSelection.matches = matches;

//             user.save(function(err) {
//               if (err) throw err;
//             });
//           }
//         });

//         res.send(JSON.stringify(data));
//       }
//     });
//   } else if (
//     req.body.userCase == "CasualDaily" ||
//     req.body.userCase == "CasualHobby" ||
//     req.body.userCase == "Career"
//   ) {
//     var score = 0;
//     var totalScore = 0;
//     if (req.body.userCase == "CasualDaily") {
//       if (req.body.preference == "male") {
//         score = 3;
//       } else if (req.body.preference == "female") {
//         score = 6;
//       }
//       if (req.body.gender == "male") {
//         score *= 3;
//       } else if (req.body.preference == "female") {
//         score *= 6;
//       }
//       totalScore = req.body.id * 100 + score;
//     } else if (req.body.userCase == "CasualHobby") {
//       totalScore = req.body.id1 * 1000 + req.body.id2 * 20;
//     } else {
//       totalScore = req.body.id1 * 10000 + req.body.id2 * 200;
//     }

//     var userObj = {
//       name: `${req.body.name}`,
//       email: `${req.body.email}`,
//       userCase: `${req.body.userCase}`,
//       content: {
//         field: `${req.body.category}`,
//         subfield: `${req.body.preference}`
//       },
//       score: totalScore
//     };

//     var daily = {
//       name: `${req.body.name}`,
//       email: `${req.body.email}`,
//       userCase: `${req.body.userCase}`,
//       gender: `${req.body.gender}`,
//       content: {
//         field: `${req.body.category}`,
//         subfield: `${req.body.preference}`
//       },
//       score: totalScore
//     };

//     var hobby = {
//       name: `${req.body.name}`,
//       email: `${req.body.email}`,
//       userCase: `${req.body.userCase}`,
//       content: {
//         field: `${req.body.category}`,
//         subfield: `${req.body.preference}`
//       },
//       score: totalScore
//     };

//     var career = {
//       name: `${req.body.name}`,
//       email: `${req.body.email}`,
//       userCase: `${req.body.userCase}`,
//       content: {
//         field: `${req.body.category}`,
//         subfield: `${req.body.preference}`
//       },
//       score: totalScore
//     };

//     DailyMatching.findOne(userObj, function(err, dbResult) {
//       if (err) throw err;
//       if (dbResult == null) {
//         var ub = null;
//         if (req.body.userCase == "CasualDaily") {
//           ub = daily;
//         } else if (req.body.userCase == "CasualHobby") {
//           ub = hobby;
//         } else {
//           ub = career;
//         }
//         DailyMatching.create(ub, function(err, dbResult) {
//           console.log("created");
//           if (err) throw err;
//         });
//       }
//     });

//     var query = { score: totalScore };
//     DailyMatching.find(query, function(err, dbResult) {
//       if (err) throw err;
//       console.log(JSON.stringify(dbResult));
//       var MatchedList = dbResult;
//       const length = MatchedList.length;
//       var index = -1;
//       const email = req.body.email;
//       for (var i = 0; i < length; ++i) {
//         if (MatchedList[i].email != email) {
//           index = i;
//           break;
//         }
//       }
//       if (index == -1) {
//         res.send("unmatched");
//         return;
//       }
//       var Matched = MatchedList[index];
//       var data = {
//         name: `${Matched.name}`,
//         email: `${Matched.email}`
//       };
//       res.send(JSON.stringify(data));
//       return;
//     });
//   }
// });

// module.exports = router;
