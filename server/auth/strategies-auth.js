const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
//const env = require("../../environment.variables");

//local signin strategy w password
passport.use(
  new LocalStrategy(function(username, password, done) {
    //console.log("localstrategy", username);  todo
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        console.log("localstrategy:", err);
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username/password." });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false, { message: "Incorrect username/password." });
        }
        return done(null, user);
      });
    });
  })
);

//verify protected route w token
const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"), //ExtractJwt.fromHeader("Authorization"),
  secretOrKey: process.env.SECRET
};

//for refresh of page verify user & token
passport.use(
  new JwtStrategy(jwtStrategyOptions, function(jwt_payload, done) {
    User.findOne({ username: jwt_payload.username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);
