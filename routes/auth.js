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

router.post("/api/passwordactivitereset", function(req,res){
  var token = md5(req.body.password);
  var userByResetToken = {resetToken: `${req.body.resetToken}`}
  var removeResetToken = {token: `${token}`,resetToken: null};

  User.findOne(userByResetToken, function(err, dbResult){
    if(dbResult == null){
      res.send("FAIL");
    }else{
      User.updateOne(userByResetToken, removeResetToken, function(err, updateResult){
        if(err) throw err;
        console.log(removeResetToken);
        console.log(updateResult);
      })
      res.send("SUCCESS");
    }
  });
});

router.post("/api/register", function(req, res) {
  //email verification
  var email = req.body.email;
  //encrypt password
  var token = md5(req.body.password);
  var verified = false;
  var confirmToken= crypto.randomBytes(20).toString('hex');

  var userByEmail = { email: `${req.body.email}` };
  var userObj = { email: `${req.body.email}`, token: `${token}`, confirmToken: `${confirmToken}`,  verified: `${verified}`};

  User.findOne(userByEmail, function(err, dbResult) {
    if (dbResult !== null && req.body.devNoDB != "on") {
      console.log(JSON.stringify(dbResult));
      res.send("FAIL");
    } else {
      if(req.body.devNoDB != "on"){
        User.create(userObj, function(err, res) {
          if (err) throw err;
        });
      }

      if(req.body.devNoEmail != "on"){
        //send email
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('app113928750@heroku.com');
        var to_email = new helper.Email(email);
        var subject = 'Confirm your MeetUW account';
        var content = new helper.Content('text/plain', 'Click to confirm http://127.0.0.1:5000/activite?t='+confirmToken);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')('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');
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
      }
      res.send("SUCCESS");
    }
  });
});

router.post("/api/resetpassword", function(req,res){
  console.log("api resetpassword called");
  var email = req.body.email;
  var userByEmail = {email: `${email}`};
  console.log("query by email: "+JSON.stringify(userByEmail));
  User.findOne(userByEmail, function(err, dbResult){
    console.log('findOne : '+dbResult);
    if(err){
      console.log("findOne err");
      res.send("FAIL");
    }
    if(dbResult == null || !dbResult.verified){
      console.log("email not found or activited");
      res.send("SUCCESS"); //this email hasn't been registered or activited, but don't reviel this info to users using reset page
    }else{
      var resetToken = crypto.randomBytes(20).toString('hex');
      var newvalues = {$set:{resetToken:`${resetToken}`}};
      User.updateOne(userByEmail, newvalues, function(err){
        if(err){
          console.log("failed to update reset token. newvalue: "+newvalues);
          res.send("FAIL");
        }
      });
      //send email
      var helper = require('sendgrid').mail;
      var from_email = new helper.Email('app113928750@heroku.com');
      var to_email = new helper.Email(email);
      var subject = 'Reset your MeetUW password';
      var content = new helper.Content('text/plain', 'Click to reset your password http://127.0.0.1:5000/passwordActivite?t='+resetToken);
      var mail = new helper.Mail(from_email, subject, to_email, content);

      var sg = require('sendgrid')('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');
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
      });

      sg.API(request, function(error, response){
        console.log("email feedback:");
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
      });
      res.send("SUCCESS");
    }
  });
});

router.post("/api/activite", function(req,res){
  console.log("backend"+req.body.token);
  var userByToken = {confirmToken: `${req.body.token}`};
  User.findOne(userByToken, function(err, result){
    if(err) throw err;
    if(result != null){
      console.log(JSON.stringify(result));
      var newvalues = {$set:{confirmToken:null, verified:true}};
      console.log(JSON.stringify(newvalues));
      User.updateOne(result,newvalues, function(err, res){
        if(err) throw err;
      });
      res.send("SUCCESS");
    }
    else{
      res.send("FAIL");
    }
  });
})

router.post("/api/passwordactivite", function(req,res){
  console.log("passwordactivite: "+req.body.token);
  var userByToken = {resetToken: `${req.body.token}`};
  User.findOne(userByToken, function(err, result){
    if(err) throw err;
    if(result != null){
      console.log(JSON.stringify(result));
      // var newvalues = {$set:{resetToken:null}};
      // console.log(JSON.stringify(newvalues));
      // User.updateOne(result,newvalues, function(err, res){
      //   if(err) throw err;
      // });
      res.send("SUCCESS");
    }
    else{
      res.send("FAIL");
    }
  });
})

router.post("/api/isloggedin", function(req, res) {
  if (req.user) {
    res.send("SUCCESS");
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
        res.send({course:
          dbResult.courseSelection.term + " " +
            dbResult.courseSelection.subject +
            dbResult.courseSelection.number, match: dbResult.courseSelection.match}
        );
      }
    });
  }
});


module.exports = router;
