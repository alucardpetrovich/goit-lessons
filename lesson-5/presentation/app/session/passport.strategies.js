import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import userModel from '../user/user.model';

passport.use(new FacebookStrategy({
  // need to create facebook application and insert your credentials
  clientID: '', 
  clientSecret: '',


  callbackURL: "http://localhost:4000/sessions/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  userModel.find()(..., function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
}
));

