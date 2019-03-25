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

router.post("/api/sendmatchemail", function(req, res){
  var helper = require("sendgrid").mail;
  var from_email = new helper.Email("app113928750@heroku.com");
  var to_email = new helper.Email(req.body.email);
  var subject = req.body.subject;
  var content = new helper.Content(
    "text/plain",
    req.body.content
  );
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
    if(error){
      res.send("FAIL");
    }else{
      res.send("SUCCESS");
    }
  });
})

module.exports = router;
