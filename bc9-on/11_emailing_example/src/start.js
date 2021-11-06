const { AuthServer } = require("./server");

// 1. add status, verificationToken fields to users table +
// 2. send email after user was created in DB
// 3. create endpoint that will verify user

async function main() {
  const server = new AuthServer();
  await server.start();
  server.startListening();
}
main();
