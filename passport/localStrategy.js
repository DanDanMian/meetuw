const User = require("../db/models/user");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done("Incorrect username", false);
      }
      if (!user.validatePassword(password)) {
        return done("Incorrect password", false);
      }
      if (!user.verified) {
        return done("Unverified Account", false);
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
