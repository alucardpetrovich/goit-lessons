const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { UserModel } = require("../user/user.model");

class PassportStrategies {
  initLocalStrategy() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password"
        },
        async function(email, password, done) {
          const user = await UserModel.findByEmail(email);

          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!(await user.validPassword(password))) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        }
      )
    );
  }
}

module.exports = new PassportStrategies();
