const express = require("express");
const router = express.Router();
const md5 = require("md5");
const db = require("../db/db");
const User = db.User;

router.post("/api/login", (req, res) => {
  var thisToken = md5(req.body.password);
  var query = { email: `${req.body.email}`, token: `${thisToken}` };

  User.findOne(query, function(err, dbResult) {
    if (err) {
      console.log(err);
      throw err;
    }
    if (dbResult == null) {
      res.send("FAIL");
    } else {
      res.send("SUCCESS");
    }
  });
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
      res.send("SUCCESS");
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
