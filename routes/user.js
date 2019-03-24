const express = require("express");
const router = express.Router();

const Profile = require("../db/models/profile");

router.post("/api/getProfile", function(req, res) {
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

router.post("/api/getEmail", function(req, res) {
  if (req.user) {
    res.send(req.user.email);
  }
});

module.exports = router;
