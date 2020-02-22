module.exports = {
  port: 3000,
  mongodb_url:
    "mongodb+srv://levkiv:1234567890@testcluster-oqqlz.mongodb.net/auth_example?retryWrites=true",
  sessionExpiresTime: 24 * 60 * 60 * 1000,
  jwtSecret: "asdfggaergasdvadf",

  oAuth: {
    google: {
      clientID:
        "194925151278-tak496dsivfbf9else3866do152f40br.apps.googleusercontent.com",
      clientSecret: "_qXDCzT_ZN0QxztmPtjfOpC1",
      callbackURL: "http://localhost:3000/auth/google/callback"
    }
  }
};
