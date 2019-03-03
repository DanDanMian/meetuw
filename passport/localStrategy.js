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
        return done(null, false, { message: "Incorrect username" });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
