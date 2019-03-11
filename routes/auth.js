const express = require("express");
const router = express.Router();
const md5 = require("md5");
const User = require("../db/models/user");

const passport = require("../passport");

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  req.session.email = req.body.email;

  var helper = require('sendgrid').mail;
  var from_email = new helper.Email('app113928750@heroku.com');
  var to_email = new helper.Email(req.body.email);
  var subject = 'Confirm your MeetUW account';
  var content = new helper.Content('text/plain', 'Click to confirm');
  var mail = new helper.Mail(from_email, subject, to_email, content);

  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response){
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });

  res.send("SUCCESS");
  console.log('after res.send');
});

router.post("/api/register", function(req, res) {
  //email verification
  var email = req.body.email;
  //encrypt password
  var token = md5(req.body.password);

  var userByEmail = { email: `${req.body.email}` };
  var userObj = { email: `${req.body.email}`, token: `${token}` };

  User.findOne(userByEmail, function(err, dbResult) {
    if (dbResult !== null) {
      res.send("FAIL");
    } else {
      User.create(userObj, function(err, res) {
        if (err) throw err;
      });

      //send email
      var helper = require('sendgrid').mail;
      var from_email = new helper.Email('app113928750@heroku.com');
      var to_email = new helper.Email(email);
      var subject = 'Confirm your MeetUW account';
      var content = new helper.Content('text/plain', 'Click to confirm');
      var mail = new helper.Mail(from_email, subject, to_email, content);

      var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response){
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
      });

      res.send("SUCCESS");
      console.log('res send success');
    }
  });
});
  

// function ValidateEmail(mail)
// {
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
//   {
//     return (true)
//   }
//     alert("You have entered an invalid email address!")
//     return (false)
// }

module.exports = router;

