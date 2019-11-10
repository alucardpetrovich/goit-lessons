const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(email, password, done) {
        const user = {};

        if ( username === 'admin' && password === 'basic' ) {
            return done(null, user);
        }

        return done(null, false, { message: 'Invalid credentials' });
    }
));
