const { UsersServer } = require("./server");

// TODO: add to user model verificationToken, status +
// TODO: forbid sign-in for non-verified user +
// TODO: send email after user registration +
// TODO: create an endpoint for user verification

new UsersServer().start();
