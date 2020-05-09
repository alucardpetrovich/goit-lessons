const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const Server = require("./server");

new Server().start();
