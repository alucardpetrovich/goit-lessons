require = require("esm")(module);
const { AuthServer } = require("./server.js");

new AuthServer().start();
