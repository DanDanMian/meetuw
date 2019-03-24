const express = require("express");
const router = express.Router();

const Profile = require("../db/models/profile");

router.post("/api/getProfile", function(req, res) {
  console.log(req.body);
  if (req.body.email) {
    console.log("HAS EMAIL");
  }
  if (req.user) {
    var userByEmail = { email: `${req.user.email}` };
    Profile.findOne(userByEmail, function(err, user) {
      if (err) throw err;
      if (user) {
        var data = {
          course:
            user.courseSelection.term +
            " " +
            user.courseSelection.subject +
            user.courseSelection.number,
          match: user.courseSelection.match,
          matches: user.courseSelection.matches
        };
        res.send(data);
      }
    });
  }
});

router.post("/api/getProfileId", function(req, res) {
  console.log("getProfileId...." + req.body.email);
  if (req.user) {
    // var userByEmail = { email: `${req.body.email}` };
    var userByEmail = { email: "user1@uwaterloo.ca" };

    Profile.findOne(userByEmail, function(err, user) {
      if (err) throw err;
      if (user) {
        res.send(user._id);
      }
    });
  }
});

router.post("/api/getEmail", function(req, res) {
  if (req.user) {
    res.send(req.user.email);
  }
});

module.exports = router;
