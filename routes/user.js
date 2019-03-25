const express = require("express");
const router = express.Router();

const Profile = require("../db/models/profile");
const mongoose = require("mongoose");

var ObjectId = require("mongodb").ObjectID;

router.post("/api/getProfile", function(req, res) {
  console.log("profileId" + req.body.profileId);
  var query = null;
  if (req.body.profileId) {
    var hex = /[0-9A-Fa-f]{6}/g;
    console.log(hex.test(req.body.profileId))
    //  var id = mongoose.Types.ObjectId(req.body.profileId);
    //var ObjectID = require('mongodb').ObjectID;
    // ObjectID.createFromHexString('55153a8014829a865bbf700d')
    query = { _id: ObjectId.createFromHexString(req.body.profileId) };
    //query = { _id: ObjectId(req.body.profileId) };
  } else {
    query = { email: `${req.user.email}` };
  }

  if (req.user) {
    Profile.findOne(query, function(err, user) {
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
        res.send({ data: data, user: user });
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
