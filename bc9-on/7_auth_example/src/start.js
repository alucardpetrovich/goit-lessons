const { AuthServer } = require("./server");

async function main() {
  const server = new AuthServer();
  await server.start();
  server.startListening();
}
main();
