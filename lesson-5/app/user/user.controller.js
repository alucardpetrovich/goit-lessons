const UserModel = require('./user.model');

class UserController {
    constructor() {}

    async signInLocal(email, password, done) {
        try {
            const user = await UserModel.findUser(email);
            
            const receivedPasswordHash = createHash(password, user.password_salt);
            const arePasswordsMatching = receivedPasswordHash === user.password_hash;

            if ( !arePasswordsMatching ) {
                return done(null, false, { message: 'Incorrect password' });
            }

            done(null, user);
        
        } catch(err) {
            done(err);
        }
    }
}
