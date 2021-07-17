const { prepareUser } = require("../users/user.serializer");

function prepareUserWithToken(userWithToken) {
  return {
    user: prepareUser(userWithToken.user),
    tokens: userWithToken.tokens,
  };
}

exports.prepareUserWithToken = prepareUserWithToken;
