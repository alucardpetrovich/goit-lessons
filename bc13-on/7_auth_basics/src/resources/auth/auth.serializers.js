const { serializeUser } = require("../users/users.serializers");

exports.serializeSignUpResponse = (userRecord) => {
  return { user: serializeUser(userRecord) };
};

exports.serializeSignInResponse = (signInResponse) => {
  return {
    user: serializeUser(signInResponse.user),
    token: signInResponse.token,
  };
};
