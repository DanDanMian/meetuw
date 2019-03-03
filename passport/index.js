const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../db/models/user");

// called on login, save id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log("*** serializeUser called, user: ");
  console.log("---------");
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;
