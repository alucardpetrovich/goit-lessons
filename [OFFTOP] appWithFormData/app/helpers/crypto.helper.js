const crypto = require('crypto');

class CryptoHelper {
  createHash(text) {
    return crypto.createHash('md5').update(text).digest('base64');
  }
}

module.exports = new CryptoHelper();
