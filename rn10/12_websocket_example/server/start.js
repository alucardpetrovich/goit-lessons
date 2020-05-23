require = require("esm")(module);
require("./config");
const { WsServer } = require("./server");

new WsServer().start();
