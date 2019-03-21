const express = require("express");
const router = express.Router();
const md5 = require("md5");
var crypto = require("crypto");

const User = require("../db/models/user");
const Profile = require("../db/models/profile");

const passport = require("../passport");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  //req.session.email = req.body.email;
  res.send("SUCCESS");
});

router.post("/api/logout", function(req, res) {
  req.logout();
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.send("SUCCESS");
  });
});

router.post("/api/register", function(req, res) {
  //email verification
  var email = req.body.email;
  //encrypt password
  var token = md5(req.body.password);
  var verified = false;
  var confirmToken = crypto.randomBytes(20).toString("hex");

  var userByEmail = { email: `${req.body.email}` };
  var userObj = {
    email: `${req.body.email}`,
    token: `${token}`,
    confirmToken: `${confirmToken}`,
    verified: `${verified}`
  };

  User.findOne(userByEmail, function(err, dbResult) {
    if (dbResult !== null && req.body.devNoDB != "on") {
      console.log(JSON.stringify(dbResult));
      res.send("FAIL");
    } else {
      if (req.body.devNoDB != "on") {
        User.create(userObj, function(err, res) {
          if (err) throw err;
        });
      }

      if (req.body.devNoEmail != "on") {
        //send email
        var helper = require("sendgrid").mail;
        var from_email = new helper.Email("app113928750@heroku.com");
        var to_email = new helper.Email(email);
        var subject = "Confirm your MeetUW account";
        var content = new helper.Content("text/plain", "Click to confirm");
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require("sendgrid")(
          "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"
        );
        var request = sg.emptyRequest({
          method: "POST",
          path: "/v3/mail/send",
          body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
        });
      }
      res.send("SUCCESS");
    }
  });
});

router.post("/api/isloggedin", function(req, res) {
  if (req.user) {
    res.send("SUCCESS");
  } else {
    res.send("FAIL");
  }
});

router.post("/api/getEmail", function(req, res) {
  if (req.user) {
    res.send(req.user.email);
  }
});

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

module.exports = router;
