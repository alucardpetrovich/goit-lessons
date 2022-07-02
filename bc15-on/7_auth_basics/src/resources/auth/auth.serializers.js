const { serializeUser } = require("../users/users.serializers");

function serializeSignIn(user, token) {
  return { user: serializeUser(user), token };
}

exports.serializeSignIn = serializeSignIn;
