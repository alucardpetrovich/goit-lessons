const PORT = process.env.PORT || 3000;

export const config = {
  port: PORT,
  mongodb_url:
    "mongodb+srv://levkiv:1234567890@testcluster-oqqlz.mongodb.net/auth_example16?retryWrites=true&w=majority",
  jwtSecret: "asdfasdfasdf",

  oAuthGoogle: {
    clientID:
      "194925151278-tak496dsivfbf9else3866do152f40br.apps.googleusercontent.com",
    clientSecret: "_qXDCzT_ZN0QxztmPtjfOpC1",
    callbackURL: `http://localhost:${PORT}/api/auth/google/callback`
  }
};
