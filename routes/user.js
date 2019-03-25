const express = require("express");
const router = express.Router();

const Profile = require("../db/models/profile");

router.post("/api/getProfile", function(req, res) {
  if (req.user) {
    var query = null;
    // If profileId provided, query by id
    if (req.body.profileId) {
      var id = req.body.profileId.slice(2, -1);
      query = { _id: id };
    }
    // Otherwise, query by current logged in user
    else {
      query = { email: req.user.email };
    }

    Profile.findOne(query, function(err, user) {
      if (err) throw err;
      if (user) {
        res.send(user);
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
