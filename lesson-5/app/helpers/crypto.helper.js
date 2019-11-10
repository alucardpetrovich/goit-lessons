const crypto = require('crypto');

class CryptoHelper {
    constructor() {}

    createHash(password, passwordSalt) {
        return crypto
            .createHash('md5')
            .update(password + passwordSalt)
            .digest('hex')
        ;
    }
}

module.exports = new CryptoHelper();
