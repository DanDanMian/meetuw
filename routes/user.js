const express = require("express");
const router = express.Router();

const Profile = require("../db/models/profile");

router.post("/api/getProfile", function(req, res) {
  if (req.user) {
    var userByEmail = { email: `${req.user.email}` };
    Profile.findOne(userByEmail, function(err, dbResult) {
      if (err) throw err;
      if (dbResult != null) {
        res.send({
          course:
            dbResult.courseSelection.term +
            " " +
            dbResult.courseSelection.subject +
            dbResult.courseSelection.number,
          match: dbResult.courseSelection.match
        });
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
