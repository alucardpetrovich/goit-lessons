const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

const PORT = 3000;

passport.use(new LocalStrategy(
    function(username, password, done) {
        const user = {};

        if ( username === 'admin' && password === 'basic' ) {
            return done(null, user);
        }

        return done(null, false, { message: 'Invalid credentials' });
    }
));

const app = express();
app.use(passport.initialize());
app.use(bodyParser());

app.post('/login/local', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failure',
    session: false,
}))

app.get('/', (req, res) => res.send('authorized'));
app.get('/failure', (req, res) => res.send('not authorized'));

app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
})
