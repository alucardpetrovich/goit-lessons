const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../.env") });
require = require("esm")(module);
const { AuthServer } = require("./server");

new AuthServer().start();
