import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleOAuthStrategy } from "passport-google-oauth2";
import { userModel } from "../user/user.model";
import { config } from "../config";

export class PassportStrategies {
  static initLocalPassportStrategy() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email"
        },
        async (email, password, done) => {
          const user = await userModel.findUserByEmail(email);
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          if (!(await user.isValidPassword(password))) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        }
      )
    );
  }

  static initGoogleOAuthStrategy() {
    passport.use(
      new GoogleOAuthStrategy(config.oAuthGoogle, async function(
        request,
        accessToken,
        refreshToken,
        profile,
        done
      ) {
        const user = await userModel.findOrCreateUserByEmail(
          profile.email,
          profile.displayName
        );
        done(null, user);
      })
    );
  }
}
