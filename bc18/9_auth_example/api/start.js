require = require("esm")(module);
const { AuthServer } = require('./server');

new AuthServer().start();
