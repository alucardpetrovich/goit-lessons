const LocalStrategy = require("passport-local").Strategy;
const GoogleOAuthStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const { UserModel } = require("../user/user.model");
const {
  oAuth: { google: googleOAuthCreds }
} = require("../config");

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

  initGoogleOAuthStrategy() {
    passport.use(
      new GoogleOAuthStrategy(googleOAuthCreds, async function(
        request,
        accessToken,
        refreshToken,
        profile,
        done
      ) {
        try {
          const { email, displayName } = profile;
          const user = await UserModel.findOrCreate(email, displayName);
          done(null, user);
        } catch (err) {
          done(err);
        }
      })
    );
  }
}

module.exports = new PassportStrategies();
