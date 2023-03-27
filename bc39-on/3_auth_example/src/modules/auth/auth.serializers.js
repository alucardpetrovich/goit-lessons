const { serializeUser } = require("../users/users.serializers");

function serializeSignInResponse(userWithToken) {
  return {
    user: serializeUser(userWithToken.user),
    token: userWithToken.token,
    tokens: userWithToken.tokens,
  };
}

function serializeRefreshTokensResponse(tokens) {
  return { tokens };
}

exports.serializeSignInResponse = serializeSignInResponse;
exports.serializeRefreshTokensResponse = serializeRefreshTokensResponse;
