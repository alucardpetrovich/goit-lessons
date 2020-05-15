const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require = require("esm")(module);
const { RegisterServer } = require("./server");

new RegisterServer().start();
