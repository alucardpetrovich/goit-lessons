const passport = require("passport");
const { UserModel } = require("../../users/user.model");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

exports.initGoogleOauthStrategy = function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        // displayName, email
        const user = await UserModel.findOneAndUpdate(
          { email: profile.email },
          { $setOnInsert: { username: profile.username } },
          { upsert: true, new: true }
        );

        done(null, user);
      }
    )
  );
};
