const { hello } = require("./child");

hello();

process.exit(0);

console.log("__dirname", __dirname);
console.log("__filename", __filename);
